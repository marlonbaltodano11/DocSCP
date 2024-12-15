from typing import Dict
from datetime import datetime, timedelta
import math

def int_to_roman(num):
    # Define a dictionary of integer values and their corresponding Roman numerals
    val = [
        1000, 900, 500, 400,
        100, 90, 50, 40,
        10, 9, 5, 4,
        1
        ]
    syb = [
        "M", "CM", "D", "CD",
        "C", "XC", "L", "XL",
        "X", "IX", "V", "IV",
        "I"
        ]
    
    roman_num = ''
    i = 0
    # Convert the integer to Roman numeral
    while num > 0:
        for _ in range(num // val[i]):
            roman_num += syb[i]
            num -= val[i]
        i += 1
    return roman_num


def are_dates_equal(date1, date2):
    return date1.date() == date2.date()

def are_dates_in_same_week(date1, date2):
    # Get the start of the week for each date (Monday)
    start_of_week1 = date1 - timedelta(days=date1.weekday())
    start_of_week2 = date2 - timedelta(days=date2.weekday())
    
    # If the start of the week for both dates is the same, they are in the same week
    return start_of_week1 == start_of_week2

def organize_dates_by_week(dates):
    # Sort the dates to ensure they are in order
    dates = sorted(dates)

    # A list to store weeks
    weeks = []
    
    # A temporary list to hold the current week
    current_week = []
    
    # Define the start of the week (Monday)
    start_of_week = dates[0] - timedelta(days=dates[0].weekday())
    
    for date in dates:
        # If the date belongs to the current week, add it
        if date >= start_of_week and date < start_of_week + timedelta(days=7):
            current_week.append(date)
        else:
            # If the date does not belong to the current week, store the current week and start a new one
            weeks.append(current_week)
            current_week = [date]
            # Update the start of the week
            start_of_week = date - timedelta(days=date.weekday())
    
    # Add the last week
    if current_week:
        weeks.append(current_week)

    return weeks


def get_valid_class_dates(academic_calendar, timetable):
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

def parse_microplanning_data(academic_calendar: Dict[str, any], timetable: Dict[str, any], course_plan: Dict[str, any]):
    microplanning_data = []
    
    class_dates = get_valid_class_dates(academic_calendar, timetable) 
    
    if not class_dates:
        return microplanning_data
    
    weeks = organize_dates_by_week(class_dates)
    last_exam_week = weeks[-1]

    first_exam_date = academic_calendar.get('first_exam_date', None)
    if first_exam_date is not None:
        first_exam_date = datetime.strptime(first_exam_date, '%Y-%m-%d')
        
    class_date_without_exams = []
    
    for date in class_dates:
        if not (first_exam_date is not None and are_dates_equal(date, first_exam_date) or are_dates_in_same_week(date, last_exam_week[0])):
            class_date_without_exams.append(date)
    
    for unit_number, unit in enumerate(course_plan, start=1):
        start_date = datetime.strptime(unit['start_date'], '%Y-%m-%d')
        end_date = datetime.strptime(unit['end_date'], '%Y-%m-%d')

        number_of_days_the_class_is_received = len([date for date in class_date_without_exams if start_date <= date <= end_date])
        number_of_topics = len(unit['topics'])

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
            if first_exam_date is not None and are_dates_equal(first_exam_date, class_date):
                microplanning_data.append([week_cell, "Examen primer parcial"])
            else:
                
                for idx, unit in enumerate(course_plan, start=1):
                    start_date = datetime.strptime(unit['start_date'], '%Y-%m-%d')
                    end_date = datetime.strptime(unit['end_date'], '%Y-%m-%d')
                    
                    if start_date <= class_date <= end_date:
                        unit_label = f"{int_to_roman(idx)}. {unit['unit_name']}"
                        
                        if not unit_label in unit_cell and len(unit['topics']) > 0:
                            # Add line break to separate units
                            unit_cell.append('\n\n')
                            objective_cell.append('\n\n')
                            topics_cell.append('\n\n')
                            
                            unit_cell.append(unit_label)
                        
                        objective = unit.get('objectives', '')
                        
                        if not objective in objective_cell and len(unit['topics']) > 0:
                            print(f"{week_cell}: {unit['topics']}")
                            objective_cell.append(objective)
                        
                        topics_cell.append('\n'.join(unit['topics'].pop()))
        
        microplanning_data.append([week_cell.strip(), '\n'.join(unit_cell).strip(), '\n'.join(objective_cell).strip(), '\n'.join(topics_cell).strip(), "", "", "", "", ""])
            
    final_exam_label = f"Semana {week_number} - {last_exam_week[0].strftime('%d/%m/%Y')} - {last_exam_week[-1].strftime('%d/%m/%Y')}"    
    microplanning_data.append([final_exam_label, "Examen final"])

    return microplanning_data


request = {
    'academic_calendar': {
        'modality': 'cuatrimestral',
        'cicle_start_date': '2025-01-20',
        'cicle_end_date': '2025-05-02',
        'first_exam_date': '2025-03-03',
        'holyday_dates': ['2025-04-14', '2025-04-15', '2025-04-16', '2025-04-17', '2025-04-18', '2025-04-19', '2025-04-20']
    },
    "timetable": {
        "monday": {
            "class_day": True,  # bool value True or False
            "periods": 3  # int number of periods
        },
        "tuesday": {
            "class_day": False,
            "periods": 2
        },
        "wednesday": {
            "class_day": False,
            "periods": 3
        },
        "thursday": {
            "class_day": True,
            "periods": 4
        },
        "friday": {
            "class_day": False,
            "periods": 3
        },
        "saturday": {
            "class_day": False,
            "periods": 2
        }
    },
    'general_information': {
        'career': 'Ingeniería Cibernética Electrónica', 
        'signature_name': 'Administración de centro de cómputos', 
        'signature_code': 'ICE0818', 
        'career_year': 'Quinto', 
        'total_hours': '60', 
        'credits': '4', 
        'teacher_fullname': '', 
        'delivery_date': '', 
        'update_date': '', 
        'approved_date': '', 
        'timetable': '', 
        'approved_by': ''
    },
    'subject_objective': '2.1. OBJETIVOS GENERALES\n\nConocer la fundamentación de los  servicios y recursos de un centro de cómputo, sus características y funciones para su uso en la solución de problemas de la ingeniería.\nEvaluar la viabilidad técnica y económica de proyectos de tecnología de la información, empleando  las herramientas de análisis pertinentes para dar solución  a problemas de la ingeniería..', 
    'methodological_recommendations': 'Se orienta al docente que imparte esta asignatura que el enfoque curricular de esta especialidad contempla como marco filosófico las teorías del socio constructivismo que concentra sus esfuerzos centrado en el aprendizaje de los estudiantes propiciando escenarios de aprendizajes que dinamicen la creatividad y el ingenio de los profesionales de que se forman en esta especialidad, teniendo en cuenta que el estudiante posee conocimientos previos de  su entorno y que por medio del trabajo colaborativo en equipo le permite el aprendizaje social, donde el docente juega un rol importante en la facilitación, orientación y motivación a la construcción de nuevos conocimientos por medio del aprendizaje significativo en estrecha relación al entorno individual y colectivo.\n1-\xa0Al iniciar cada unidad es importante explicar sus objetivos, estrategias y experiencias de aprendizaje de forma clara, precisa y concisa al describir cada uno de los contenidos de manera que el estudiante sea orientado con actividades de auto estudio y estudio independiente para la construcción de conocimiento por medio del aprendizaje significativo para una mejor comprensión de los temas a tratar.\n2- Partir siempre de los conocimientos del alumno sobre el tema a impartir y hacerles participar en la exposición, propiciando intervenciones personales o grupales\n3-\xa0En el desarrollo de las clases prácticas cada contenido expuesto debe consolidarse con la resolución de ejercicios relacionados al entorno de su realidad local en principio y a su perfil profesional, que se efectúan en un primer momento durante la clase, luego de manera individual acompañados de guías construidas con objetivos de aprendizaje que orienten los resultados esperados y finalmente socializando lo que aprendió compartiendo en equipos de trabajo para posteriormente incrementar  el grado de dificultad de acuerdo al avance del contenido la planeación didáctica.\n4-\xa0Para motivar el estudio independiente de esta asignatura, orientar actividades de aprendizaje tareas semanales que puedan tener algún peso académico adicional, como lo estime el docente. Estas actividades de aprendizaje deben ser orientadas para profundizar en el estudio de los temas abordados en clase y hacer uso extensivo de aplicaciones informáticas como la Internet con guías de orientación didáctica que den al estudiante una visión global de las aplicaciones en las que interviene la geometría analítica.\n5-\xa0Establecer un ciclo de conferencias – seminarios, de ser posible, que abarquen diferentes temas de interés en el curso, para desarrollar\xa0 habilidades investigativas y expositivas en los estudiantes', 
    'evaluation_method': 'Dos exámenes escritos de 35% cada uno                          70%\nTrabajos prácticos y exámenes cortos                                30%\nTotal de puntaje acumulado                                              100%', 
    'course_plan': [
        {'unit_name': 'LAS ORGANIZACIONES', 'start_date': '2025-01-20', 'end_date': '2025-01-31', 'topics': ['Conceptos fundamentales.', 'La información dentro de una empresa.', 'El activo de información.', 'La importancia de la buena información.', 'Los sistemas de información.', 'Concepto de tecnología de información (IT).'], 'objectives':'Objetivo de la unidad I'},
        {'unit_name': 'CONCEPTOS BÁSICOS SOBRE CENTROS DE CÓMPUTO', 'start_date': '2025-02-01', 'end_date': '2025-02-13', 'topics': ['Teoría del cambio.', 'La paradoja de la tecnología de información.', 'Liderazgo.', 'Trabajo de equipo.', 'Teoría de la calidad.', 'Relación cliente – proveedor.', 'Administración de un proyecto tecnológico.'], 'objectives':'Objetivo de la unidad II'},
        {'unit_name': 'ELEMENTOS DE ADMINISTRACIÓN APLICABLES EN UN ÁREA DE CÓMPUTO.', 'start_date': '2025-02-14', 'end_date': '2025-02-28', 'topics': ['Visión a futuro.', 'Planeación estratégica.', 'Roles y responsabilidades del área de sistemas de información.', 'Administración de recursos humanos.', 'Métodos de trabajo y sus beneficios.', 'Importancia de la participación activa: directivo–cliente'], 'objectives':'Objetivo de la unidad III'},
        {'unit_name': 'PROCESO DE EVALUACIÓN DE UN PROYECTO DE TECNOLOGÍA DE INFORMACIÓN.', 'start_date': '2025-03-01', 'end_date': '2025-03-14', 'topics': ['Antecedentes y administración del proyecto.', 'Estudio de mercado.', 'Estudio técnico.', 'Estudio económico.', 'Elementos y aplicaciones de la evaluación económica.'], 'objectives':'Objetivo de la unidad IV'},
        {'unit_name': 'ADMINISTRACIÓN DE LA SEGURIDAD INFORMÁTICA', 'start_date': '2025-03-15', 'end_date': '2025-03-31', 'topics': ['Conceptos sobre seguridad informática.', 'Políticas, normas y estándares de seguridad.', 'Seguridad física.', 'Seguridad de aplicaciones.', 'Planes de contingencia: planes de recuperación en casos de desastres; business impact análisis; diagnóstico y evaluación de riesgos.', 'Cómo evitar o minimizar desastres en cómputo.', 'Auditoría técnica.'], 'objectives':'Objetivo de la unidad V'},
        {'unit_name': 'ORGANIZACIÓN DE LOS CENTROS DE CÓMPUTO.', 'start_date': '2025-04-01', 'end_date': '2025-04-25', 'topics': ['Características generales.', 'Localización en la organización.', 'Centralización contra descentralización.', 'Modelos de organización'], 'objectives':'Objetivo de la unidad VI'}
    ],
    'bibliography': 'BÁSICAS*\n\nBurch, J. y Grudnitski, G. (1997). Diseño de sistemas de información. México. Ed. Limusa.\n\nFine, F. (1995). Seguridad en centros de cómputo. México. Ed. Trillas.\n\nHernández Jiménez, R. (1991). Administración de centros de cómputo. México. Ed. Trillas.\n\nWeber, R.  (1999). EDP Auditing. Conceptual foundations and practice. . McGraw-Hill.\n\n\nCOMPLEMENTARIAS*\n\nArias , F. (1999). Administración de recursos humanos. México. Ed. Trillas.\n\nBaca Urbina, G. (1999). Evaluación de proyectos. México. Ed. McGraw -Hill.\n\nThuesen, H. G. (1981). Ingeniería económica. México. Ed. Prentice Hall.\n\nVan Gigch, J. P. (1987). Teoría General de Sistemas. México. Ed. Trillas.\n\nLaudon Kenneth C. y Laudon Jane P. (2002). Administración de los sistemas de información. México. Ed. Pearson Educación.\n\n\n\n*'
}

from pprint import pprint
pprint(parse_microplanning_data(request['academic_calendar'], request['timetable'], request['course_plan']))