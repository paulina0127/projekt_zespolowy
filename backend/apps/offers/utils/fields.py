from django.contrib.postgres.fields import ArrayField as PostgresArrayField
from django.forms import CheckboxSelectMultiple, MultipleChoiceField


# Multiple choice field stored as Array
class MultipleChoiceField(MultipleChoiceField):

    def __init__(self, *args, **kwargs):
        kwargs.pop("base_field", None)
        kwargs.pop("max_length", None)
        super().__init__(*args, **kwargs)


class ChoiceArrayField(PostgresArrayField):

    def formfield(self, **kwargs):
        return super().formfield(
            **{
                "form_class": MultipleChoiceField,
                "choices": self.base_field.choices,
                "widget": CheckboxSelectMultiple,
                **kwargs,
            }
        )
