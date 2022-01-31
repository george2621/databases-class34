1- The columns which violate 1NF are :  (member_id  member_name) because it's duplicated and there is no primary key
and (food_code | food_description ) because it contain many values and it should contain single value.

2- The entities are : Member , Dinner, Food.

3- The tables and relations between it :

relation between tables : Member and Dinner is many to many so we will create third table.
relation between tables : Dinner and Food is many to many so we will create third table.
