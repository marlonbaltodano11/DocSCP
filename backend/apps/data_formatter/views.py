import json
from django.http import JsonResponse
from django.views import View
from apps.data_formatter.services.data_formatter_service import DataFormatterService
from apps.plan_extractor.serializers import CamelCaseJSONSerializer
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views import View

@method_decorator(csrf_exempt, name='dispatch')
class ProcessLessonPlanView(View):
    def post(self, request, *args, **kwargs):
        # Verificar si se ha enviado la data en el body
        if not request.body:
            return JsonResponse({'error': 'No data provided'}, status=400)

        try:
            # Decodificar los datos JSON enviados en el cuerpo de la solicitud
            data = json.loads(request.body)

            # Usar el serializador para convertir las llaves de camelCase a snake_case
            data_in_snake_case = CamelCaseJSONSerializer.detransform(data)

            # Instanciar el servicio para formatear los datos
            data_formatter = DataFormatterService()
            data_formatted = data_formatter.format_data(data_in_snake_case)  # Procesar la data

            # Convertir los datos procesados de nuevo a camelCase para la respuesta
            data_in_camel_case = CamelCaseJSONSerializer.transform(data_formatted)

            # Devolver la respuesta formateada en camelCase
            return JsonResponse(data_in_camel_case, status=200)
        
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON format'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
