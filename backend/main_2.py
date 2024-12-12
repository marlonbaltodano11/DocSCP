from apps.data_formatter.services.data_formatter_service import DataFormatterService

request = {
    'academic_calendar': {
        'modality': 'cuatrimestral',
        'cicle_start_date': '2024-07-03',
        'cicle_end_date': '2024-10-03',
        'first_exam_date': '2024-07-03',
        'holyday_dates': ['2024-07-03', '2024-07-03', '2024-07-03']
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
            "class_day": True,
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
        {'unit_name': 'LAS ORGANIZACIONES', 'start_date': '2024-07-03', 'end_date': '2024-09-29', 'topics': ['Conceptos fundamentales.', 'La información dentro de una empresa.', 'El activo de información.', 'La importancia de la buena información.', 'Los sistemas de información.', 'Concepto de tecnología de información (IT).']},
        {'unit_name': 'CONCEPTOS BÁSICOS SOBRE CENTROS DE CÓMPUTO', 'start_date': '2024-07-03', 'end_date': '2024-09-29', 'topics': ['Teoría del cambio.', 'La paradoja de la tecnología de información.', 'Liderazgo.', 'Trabajo de equipo.', 'Teoría de la calidad.', 'Relación cliente – proveedor.', 'Administración de un proyecto tecnológico.']},
        {'unit_name': 'ELEMENTOS DE ADMINISTRACIÓN APLICABLES EN UN ÁREA DE CÓMPUTO.', 'start_date': '2024-07-03', 'end_date': '2024-09-29', 'topics': ['Visión a futuro.', 'Planeación estratégica.', 'Roles y responsabilidades del área de sistemas de información.', 'Administración de recursos humanos.', 'Métodos de trabajo y sus beneficios.', 'Importancia de la participación activa: directivo–cliente']},
        {'unit_name': 'PROCESO DE EVALUACIÓN DE UN PROYECTO DE TECNOLOGÍA DE INFORMACIÓN.', 'start_date': '2024-07-03', 'end_date': '2024-09-29', 'topics': ['Antecedentes y administración del proyecto.', 'Estudio de mercado.', 'Estudio técnico.', 'Estudio económico.', 'Elementos y aplicaciones de la evaluación económica.']},
        {'unit_name': 'ADMINISTRACIÓN DE LA SEGURIDAD INFORMÁTICA', 'start_date': '2024-07-03', 'end_date': '2024-09-29', 'topics': ['Conceptos sobre seguridad informática.', 'Políticas, normas y estándares de seguridad.', 'Seguridad física.', 'Seguridad de aplicaciones.', 'Planes de contingencia: planes de recuperación en casos de desastres; business impact análisis; diagnóstico y evaluación de riesgos.', 'Cómo evitar o minimizar desastres en cómputo.', 'Auditoría técnica.']},
        {'unit_name': 'ORGANIZACIÓN DE LOS CENTROS DE CÓMPUTO.', 'start_date': '2024-07-03', 'end_date': '2024-09-29', 'topics': ['Características generales.', 'Localización en la organización.', 'Centralización contra descentralización.', 'Modelos de organización']}
    ],
    'bibliography': 'BÁSICAS*\n\nBurch, J. y Grudnitski, G. (1997). Diseño de sistemas de información. México. Ed. Limusa.\n\nFine, F. (1995). Seguridad en centros de cómputo. México. Ed. Trillas.\n\nHernández Jiménez, R. (1991). Administración de centros de cómputo. México. Ed. Trillas.\n\nWeber, R.  (1999). EDP Auditing. Conceptual foundations and practice. . McGraw-Hill.\n\n\nCOMPLEMENTARIAS*\n\nArias , F. (1999). Administración de recursos humanos. México. Ed. Trillas.\n\nBaca Urbina, G. (1999). Evaluación de proyectos. México. Ed. McGraw -Hill.\n\nThuesen, H. G. (1981). Ingeniería económica. México. Ed. Prentice Hall.\n\nVan Gigch, J. P. (1987). Teoría General de Sistemas. México. Ed. Trillas.\n\nLaudon Kenneth C. y Laudon Jane P. (2002). Administración de los sistemas de información. México. Ed. Pearson Educación.\n\n\n\n*'
}

if __name__ == "__main__":
    data_formatter = DataFormatterService()
    
    data_formatted = data_formatter.format_data(request) #Request es la peticion del usuario y data_formatted es la respuesta del servidor
    
    from pprint import pprint
    pprint(data_formatted)