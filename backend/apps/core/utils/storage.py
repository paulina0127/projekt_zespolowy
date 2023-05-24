from django.core.files.storage import FileSystemStorage


class CustomStorage(FileSystemStorage):
    def get_valid_name(self, name):
        # Return a filename that's suitable for the underlying filesystem (i.e.it doesn't contain any characters that are not allowed by the filesystem). Replace spaces with underscores.
        name = name.replace(" ", "_")
        return super().get_valid_name(name)
