from datetime import datetime, timedelta

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


if __name__ == "__main__":
    dates = [
        datetime(2024, 12, 12),
        datetime(2024, 12, 10),
        datetime(2024, 12, 8),
        datetime(2024, 12, 6),
        datetime(2024, 12, 14)
    ]

    weeks = organize_dates_by_week(dates)

    for i, week in enumerate(weeks):
        print(f"Week {i + 1}: {[date.strftime('%Y-%m-%d') for date in week]}")