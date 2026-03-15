from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager


class User(AbstractUser):
    class Role(models.TextChoices):
        ADMIN = "ADMIN", "Admin"
        CUSTOMER = "CUSTOMER", "Customer"

    role: str = models.CharField(
        max_length=10, choices=Role.choices, default=Role.ADMIN
    )
    base_role: str = Role.ADMIN

    def save(self, *args: tuple, **kwargs: dict) -> None:
        if not self.pk:
            self.role = self.role or self._meta.model.base_role
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f"{self.username} ({self.role})"

    @property
    def is_customer(self) -> bool:
        return self.role == self.Role.CUSTOMER
