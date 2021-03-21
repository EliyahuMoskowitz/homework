my_name = 'eliyahu'
address = '2530 Nostrand Avenue'
list_of_names = ['yy', 'baruch', 'marvin', 'rhoda']

# print(f'my name is: {my_name}, address: {address}, list of names: {list_of_names}')

s = ''  # my_name + address
for st in list_of_names:
    s = s + ' ' + st
# print(s)

print(f'my name is: {my_name}, address: {address}, list of names: {s}')
# print('my name is: {}, address: {}, list of names: {}'.format(my_name, address, s))

print(my_name[::3])
print(my_name[2::3])


print(list_of_names[-2][1:-1])