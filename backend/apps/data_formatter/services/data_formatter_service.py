from typing import Dict
from utils.roman_number_utils import int_to_roman
from datetime import datetime, timedelta
from utils.date_utils import organize_dates_by_week, are_dates_in_same_week, are_dates_equal
import math

class DataFormatterService:
    
    CHECKBOXES_TEMPLATE = {
        "{{modality}}": "",
        "{{academic_regime}}": "",
        "{{credits}}": '',
        "{{weekly_frequency}}": '',
    }
    
    def __init__(self):
        pass
    
    def _get_valid_class_dates(self, academic_calendar, timetable):
        # Convertir las fechas a objetos datetime
        start_date = datetime.strptime(academic_calendar['cicle_start_date'], '%Y-%m-%d')
        end_date = datetime.strptime(academic_calendar['cicle_end_date'], '%Y-%m-%d')
        holyday_dates = [datetime.strptime(date, '%Y-%m-%d') for date in academic_calendar['holyday_dates']]
        
        # Días de clase de la semana (lunes=0, domingo=6)
        class_days = [i for i, day_info in enumerate(timetable.values()) if day_info['class_day']]

        # Generar todas las fechas válidas entre el rango, excluyendo festivos y días sin clase
        valid_class_dates = []
        current_date = start_date
        while current_date <= end_date:
            # Verificar si el día es un día de clase y no es festivo
            if current_date.weekday() in class_days and current_date not in holyday_dates:
                valid_class_dates.append(current_date)
            current_date += timedelta(days=1)

        return valid_class_dates
    
    def _parse_microplanning_data(self, academic_calendar: Dict[str, any], timetable: Dict[str, any], course_plan: Dict[str, any]):
        microplanning_data = []
        
        class_dates = self._get_valid_class_dates(academic_calendar, timetable) 
        
        if not class_dates:
            return microplanning_data
        
        weeks = organize_dates_by_week(class_dates)
        last_exam_week = weeks[-1]

        first_exam_date = academic_calendar.get('first_exam_date', None)
        if first_exam_date is not None:
            first_exam_date = datetime.strptime(first_exam_date, '%Y-%m-%d')
            
        class_dates_without_exams = []
        
        for date in class_dates:
            if not (first_exam_date is not None and are_dates_equal(date, first_exam_date) or are_dates_in_same_week(date, last_exam_week[0])):
                class_dates_without_exams.append(date)
        
        for unit in course_plan:
            if not unit['start_date'] or not unit['end_date']:
                continue
            
            start_date = datetime.strptime(unit['start_date'], '%Y-%m-%d')
            end_date = datetime.strptime(unit['end_date'], '%Y-%m-%d')

            number_of_days_the_class_is_received = len([date for date in class_dates_without_exams if start_date <= date <= end_date])
            number_of_topics = len(unit.get('topics', []))

            if number_of_topics < 1:
                continue

            # Inicializamos las listas para los días de clase
            divided_topics = [[] for _ in range(number_of_days_the_class_is_received)]

            # Calcular cuántos temas debe recibir cada día (como mínimo)
            base_topics_per_day = number_of_topics // number_of_days_the_class_is_received
            extra_topics = number_of_topics % number_of_days_the_class_is_received

            current_topic = 0

            # Asignar los temas de la lista a los días correspondientes
            for day in range(number_of_days_the_class_is_received):
                # Cada día recibe la cantidad base de temas
                topics_for_day = base_topics_per_day

                # Los primeros 'extra_topics' días reciben un tema adicional
                if day < extra_topics:
                    topics_for_day += 1

                # Asignar los temas correspondientes al día actual
                divided_topics[day] = unit['topics'][current_topic:current_topic + topics_for_day]
                current_topic += topics_for_day

            # Actualizar la lista de temas en la unidad
            divided_topics = divided_topics[::-1]
            unit['topics'] = divided_topics
        
        week_number = 1  # Para llevar el control del número de semana
        for week in weeks[:-1]:
            if not week:
                continue
            
            week_start = week[0]
            week_end = week[-1]
            
            week_cell = f"Semana {week_number} - {week_start.strftime('%d/%m/%Y')} - {week_end.strftime('%d/%m/%Y')}"
            week_number += 1
            unit_cell = []
            objective_cell = []
            topics_cell = []
            
            for class_date in week:       
                if first_exam_date is not None and are_dates_in_same_week(first_exam_date, class_date):
                    microplanning_data.append([week_cell, "Examen primer parcial"])
                    first_exam_date = None
                else:
                    
                    for idx, unit in enumerate(course_plan, start=1):
                        if not unit['start_date'] or not unit['end_date']:
                            continue
                        
                        start_date = datetime.strptime(unit['start_date'], '%Y-%m-%d')
                        end_date = datetime.strptime(unit['end_date'], '%Y-%m-%d')
                        
                        if start_date <= class_date <= end_date:
                            unit_label = f"{int_to_roman(idx)}. {unit.get('unit_name', '')}"
                            
                            if not unit_label in unit_cell and len(unit.get('topics', [])) > 0:
                                # Add line break to separate units
                                unit_cell.append('\n\n')
                                objective_cell.append('\n\n')
                                topics_cell.append('\n\n')
                                
                                unit_cell.append(unit_label)
                            
                            objective = unit.get('objectives', '')
                            
                            if not objective in objective_cell and len(unit.get('topics', [])) > 0:
                                objective_cell.append(objective)
                            
                            topics_cell.append('\n'.join(unit['topics'].pop()))
            
            microplanning_data.append([week_cell.strip(), '\n'.join(unit_cell).strip(), '\n'.join(objective_cell).strip(), '\n'.join(topics_cell).strip(), "", "", "", "", ""])
                
        final_exam_label = f"Semana {week_number} - {last_exam_week[0].strftime('%d/%m/%Y')} - {last_exam_week[-1].strftime('%d/%m/%Y')}"    
        microplanning_data.append([final_exam_label, "Examen final"])

        return microplanning_data
            
    
    def format_data(self, data: Dict[str, any]):
        checkboxes = self.CHECKBOXES_TEMPLATE.copy()
        
        checkboxes["{{modality}}"] = 'semi-in-person' if data['academic_calendar']['modality'] == 'trimestre' else 'in-person'
        checkboxes["{{academic_regime}}"] = data['academic_calendar']['modality']
        try:
            checkboxes["{{credits}}"] = int(data['general_information']['credits'])
        except:
            checkboxes["{{credits}}"] = 0
            
        checkboxes["{{weekly_frequency}}"] = len([True for weekday in data['timetable'].keys() if data['timetable'][weekday]['class_day']])
        
        microplanning_table = self._parse_microplanning_data(data['academic_calendar'], data['timetable'], data['course_plan'])
        
        schedule_table = {
            "first_partial": [
                    ["", "", "", "", "", ""],
            ],
            "second_partial": [
                    ["", "", "", "", "", ""],
            ]
        }
        


        formatted_data = {
            "checkboxes": checkboxes,
            "{{signature_name}}": data.get('general_information', {}).get('signature_name', ''),
            "{{signature_code}}": data.get('general_information', {}).get('signature_code', ''),
            "{{career_year}}": data.get('general_information', {}).get('career_year', ''),
            "{{total_hours}}": data.get('general_information', {}).get('total_hours', ''),
            "{{career}}": data.get('general_information', {}).get('career', ''),
            "{{teacher_fullname}}": data.get('general_information', {}).get('teacher_fullname', ''),
            "{{delivery_date}}": data.get('general_information', {}).get('delivery_date', ''),
            "{{update_date}}": data.get('general_information', {}).get('update_date', ''),
            "{{approved_date}}": data.get('general_information', {}).get('approved_date', ''),
            "{{timetable}}": data.get('general_information', {}).get('timetable', ''),
            "{{approved_by}}": data.get('general_information', {}).get('approved_by', ''),
            "{{subject_objective}}": data.get('subject_objective', ''),
            "{{methodological_recommendations}}": data.get('methodological_recommendations', ''),
            "{{evaluation_method}}": data.get('evaluation_method', ''),
            "microplanning_table": microplanning_table,
            "{{schedule_description}}": data.get('schedule_description', ''),
            "schedule_table": schedule_table,
            "{{bibliography}}": data.get('bibliography', ''),
        }
        
        return formatted_data

        