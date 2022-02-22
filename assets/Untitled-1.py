n = int(input("Enter iterations:"))
r1 = int(input("Enter the number in respect to which x is to be ratioed:"))
r2 = int(input("Enter the number in respect to which y is to be ratioed:"))

for i in range(n):
    x = int(input("Enter x coordinate:"))
    y = int(input("Enter y coordiate:"))

    f_x = x / r1
    f_y = y / r2

    print("new Agent( new Dot(width * "+str(f_x)+", height * "+str(f_y)+"))")
    