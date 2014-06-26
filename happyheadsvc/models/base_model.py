__author__ = 'Ashkan'


class BaseModel():
    def to_json(self):
        """
        Used for JSON serialization, otherwise json.dumps will not know how to serialize. The JSON
        serializer will serialize each field individually if necessary.

        """
        fields = self._get_fields()

        # Caller does not want to decrypt, so just return the object's internal dict to
        # serialize.
        return fields

    def _get_fields(self):
        """
        Returns list of public fields for this model object.
        """
        return {field: value for field, value in self.__dict__.iteritems() if not field.startswith('_')}

    def map(self, obj):
        for attribute_name in self.__dict__:
            if not attribute_name.startswith('_') and attribute_name in obj:
                setattr(self, attribute_name, obj[attribute_name])