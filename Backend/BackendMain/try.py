import math

dividend = 10
divisor = 3

for x in range(10):
    print(dividend, '/', divisor, '=', dividend/divisor, 'which is', math.floor(dividend/divisor))
    print(dividend, '/', divisor, '=', dividend/divisor, 'which is', ((dividend + (divisor / 2))/(divisor)))
    print("")
    dividend += 2
    divisor += 1

# int i = (x + (n / 2)) / n