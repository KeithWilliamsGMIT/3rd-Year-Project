"""
AUTHOR:			KEITH WILLIAMS
DATE:			15/3/2017
DESCRIPTION:	Contains model classes
"""

from passlib.hash import bcrypt

class User:
	# __init__ is called when the object user is created
	def __init__(self, username, password, is_password_encrypted):
        # Assign values to this users username and password
		self.username = username
		self.password = password
		
		# Encrypt the password if it is not already encrypted
		if not is_password_encrypted:
			self.encrypt_password()
	
	# Encrypt the users password
	def encrypt_password(self):
		self.password = bcrypt.encrypt(self.password)
	
	# Return true if the given password matches this users password
	def verify_password(self, password):
		return bcrypt.verify(password, self.password)
	
	# Return this object in json format
	def to_json(self):
		return {"username": self.username, "password": self.password}
		