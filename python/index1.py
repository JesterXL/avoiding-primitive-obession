from dataclasses import dataclass, astuple
from enum import Enum
from returns.result import Result, Success, Failure
from functools import reduce

class Team(Enum):
	Red = "red"
	Blue = "blue"

def team_to_str(teamName:Team) -> str:
	# match teamName:
	# 	case Team.Red:
	# 			return "red"
	# 	case Team.Blue:
	# 			return "blue"
	# 	case _:
	# 			return "uh"
	if teamName == Team.Red:
		return "red"
	elif teamName == Team.Blue:
		return "blue"
	else:
		return "uh"

@dataclass
class Person:
    team: Team
    name: str
    age: int
    phone: str
    
    def __str__(self):
        return f'Person(team={team_to_str(self.team)}, name={self.name}, age={self.age}, phone={self.phone})'

def get_person(team:Team, name:str, age:int, phone:str) -> Result[Person, str]:
	return (
		validate_name(name)
		.bind(lambda _: validate_phone(phone))
		.bind(lambda _: validate_age(age))
		.bind(lambda _: Success(Person(team, phone, age, name)))
	)

def all_blanks(acc, character):
	if acc == False:
		return False
	elif character == "":
		return True
	else:
		return False

def validate_name(name:str) -> Result[str, str]:
	# can't be 0 characters
	if len(name) < 1:
		return Failure('name cannot be blank')
	
	# can't be a bunch-o-blanks
	if reduce(all_blanks, name.split(), True) == True:
		return Failure('name cannot be a bunch of blanks')
	
	return Success(name)

def validate_phone(phone:str) -> Result[str, str]:
	if len(phone) < 9:
		return Failure('phone cannot be less than 9 characters')

	if reduce(is_ok_phone_character, list(phone.strip()), True) == False:
		return Failure('phone has an unknown character, it must be either a number or ), (, or - as we strip our blank spaces')
	
	return Success(phone)

def is_parseable_int(character:str) -> bool:
	try:
		parsed = int(character)
		return True
	except:
		return False

def is_ok_phone_character(acc:bool, character:str) -> bool:
	if acc == False:
		return False
	
	if character == ')' or character == '(' or character == '-':
		return True
	
	return is_parseable_int(character)

def validate_age(age:int) -> Result[int, str]:
	if age < 0:
		return Failure('age must be greater than -1')

	return Success(age)

jesse = get_person(Team.Red, "804-555-1234", 42, "Jesse")
print(jesse)

