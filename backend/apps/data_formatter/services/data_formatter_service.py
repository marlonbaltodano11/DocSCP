from typing import Dict
from utils.roman_number_utils import int_to_roman
from datetime import datetime, timedelta

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
    
    def _parse_microplanning_data(self, academic_calendar: Dict[str, any], timetable: Dict[str, any], first_exam_date: str, course_plan: Dict[str, any]):
        # Obtener las fechas válidas de clases
        class_dates = self._get_valid_class_dates(academic_calendar, timetable)

        if first_exam_date is not None:
            first_exam_date = datetime.strptime(first_exam_date, '%Y-%m-%d')

        # La última semana se reserva para exámenes
        last_exam_date = class_dates[-1]  # La última semana es para el examen
        exam_week_start = last_exam_date - timedelta(days=last_exam_date.weekday())  # Inicio de la semana de exámenes

        microplanning_data = []
        week_number = 1  # Para llevar el control del número de semana

        # Iterar sobre cada unidad del plan de curso
        for idx, unit in enumerate(course_plan):
            unit_name = f"{int_to_roman(idx + 1)}. {unit['unit_name']}"

            # Calcular las semanas válidas para esta unidad
            unit_start_date = datetime.strptime(unit['start_date'], '%Y-%m-%d')
            unit_end_date = datetime.strptime(unit['end_date'], '%Y-%m-%d')
            weeks_for_this_unit = [
                [date for date in class_dates if unit_start_date <= date <= unit_end_date and date < exam_week_start]
            ]

            # Dividir equitativamente los temas entre las semanas de la unidad
            topics = unit.get('topics', [])
            topics_per_week = max(1, len(topics) // len(weeks_for_this_unit))

            for week in weeks_for_this_unit:
                week_start = week[0]
                week_end = week[-1]

                # Formato: "Semana X - Fecha Inicio - Fecha Fin" en formato dd/mm/yyyy
                week_label = f"Semana {week_number} - {week_start.strftime('%d/%m/%Y')} - {week_end.strftime('%d/%m/%Y')}"
                week_number += 1  # Incrementar el número de semana

                # Si hay un examen en esta semana, agregar una fila para el examen
                if first_exam_date is not None and first_exam_date in week:
                    microplanning_data.append([week_label, "Examen primer parcial"])
                else:
                    # Obtener los temas de esta semana
                    week_topics = topics[:topics_per_week]
                    topics = topics[topics_per_week:]  # Remover los temas asignados

                    # Agregar los datos de la unidad y los temas
                    microplanning_data.append([week_label, unit_name, unit.get('objectives', ''), '\n'.join(week_topics), "", "", "", "", ""])

        # Agregar la semana de exámenes finales
        final_exam_label = f"Semana {week_number} - {exam_week_start.strftime('%d/%m/%Y')} - {last_exam_date.strftime('%d/%m/%Y')}"
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
        
        microplanning_table = self._parse_microplanning_data(data['academic_calendar'], data['timetable'], data['academic_calendar'].get('first_exam_date', None), data['course_plan'])
        
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

        