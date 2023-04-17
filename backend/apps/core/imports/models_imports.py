from django.db import models

from ..utils.choices import SkillType
from ..utils.validators import (validate_category_parent, validate_city,
                                validate_postal_code)
