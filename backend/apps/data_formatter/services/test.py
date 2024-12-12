from datetime import datetime, timedelta

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

# Ejemplo de uso
academic_calendar = {
    'modality': 'cuatrimestral',
    'cicle_start_date': '2024-07-01',
    'cicle_end_date': '2024-07-31',
    'first_exam_date': '2024-07-03',
    'holyday_dates': ['2024-07-04', '2024-07-10', '2024-07-18']
}

timetable = {
    "monday": {
        "class_day": True,  
        "periods": 3  
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
}

valid_dates = get_valid_class_dates(academic_calendar, timetable)
for date in valid_dates:
    print(date.strftime('%Y-%m-%d'))
