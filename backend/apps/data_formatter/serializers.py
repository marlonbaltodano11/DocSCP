import inflection
from rest_framework import serializers

class CamelCaseJSONSerializer(serializers.Serializer):
    """
    Serializador que convierte automáticamente las claves de snake_case a camelCase y viceversa.
    """

    def to_representation(self, instance):
        """
        Transforma las claves de snake_case a camelCase al serializar los datos.
        """
        data = super().to_representation(instance)
        return self._transform_keys(data, self._to_camel_case)

    def to_internal_value(self, data):
        """
        Transforma las claves de camelCase a snake_case al deserializar los datos.
        """
        data = self._transform_keys(data, self._to_snake_case)
        return super().to_internal_value(data)

    def _transform_keys(self, data, transform_function):
        """
        Aplica la función de transformación de claves al diccionario o lista proporcionado, de forma recursiva.
        """
        if isinstance(data, dict):
            transformed_data = {}
            for key, value in data.items():
                try:
                    new_key = transform_function(key)
                    transformed_data[new_key] = self._transform_keys(value, transform_function)
                except Exception as e:
                    raise serializers.ValidationError(f"Error transformando clave '{key}': {str(e)}")
            return transformed_data
        elif isinstance(data, list):
            return [self._transform_keys(item, transform_function) for item in data]
        else:
            return data

    def _to_snake_case(self, key):
        """
        Convierte camelCase a snake_case.
        """
        if not isinstance(key, str):
            return key
        return inflection.underscore(key)

    def _to_camel_case(self, key):
        """
        Convierte snake_case a camelCase.
        """
        if not isinstance(key, str):
            return key
        return inflection.camelize(key, uppercase_first_letter=False)
    
    @staticmethod
    def transform(data):
        """
        Transforma un diccionario o lista de diccionarios de snake_case a camelCase.
        """
        serializer = CamelCaseJSONSerializer()
        return serializer._transform_keys(data, serializer._to_camel_case)
    
    @staticmethod
    def detransform(data):
        """
        Transforma un diccionario o lista de diccionarios de camelCase a snake_case.
        """
        serializer = CamelCaseJSONSerializer()
        return serializer._transform_keys(data, serializer._to_snake_case)

