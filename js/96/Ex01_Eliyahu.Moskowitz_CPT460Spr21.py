from datetime import datetime

print("Hello and Welcome to our SuperMarket!!")

barcodes = ["0001","0010","0011","0111"]
product_name = ["kiddush wine","bread","candles","matches"]
price = ["9.99","3.50","2.00","0.5"]

#  these are the products the user will buy
bought_barcodes = []
bought_product_name = []
bought_price = []

# get the date from the user
gotDate = False
while(gotDate == False):
    try:
        todaysDate = input("Please enter today's date - day/month/year:\n").split('/')
        time = input("Please enter the Time - Hour:Minute\n").split(':')
        todaysDate = datetime(year=int(todaysDate[2]), month=int(todaysDate[1]), day=int(todaysDate[0]),
             hour=int(time[0]), minute=int(time[1]))
        
        gotDate = True
    except:
        print('OOPS! Sorry! There was an error in the date or Time. Please try again')
        pass


barcode = ''
total = 0
i = 0
while(barcode != 'done'):
    # get the bar code from the user
    barCode = input("Please enter a Bar Code - or if finished, type done:\n")
    if(barCode == 'done'):
        break

    theProductName = ''
    product_price = 0

    # get the product name  and price matching the bar code
    for b in barcodes:
        if barCode == b:
            theProductName = product_name[i]
            product_price = price[i]
            total  = total + float(price[i])
            theBarCode = barCode

            bought_barcodes.append(barCode)
            bought_product_name.append(theProductName)
            bought_price.append(product_price)

    i = i + 1

#  printing receipt
index = 0
print('Thank You for shopping with us!!')
for b in bought_barcodes:
    print(f'You bought {bought_product_name[index]}')
    print(f'The bar code was {b}')
    print(f'the price : ${bought_price[index]}')
    index = index + 1

print(f'Total Price: ${total}')
print(f"Today's Date: {todaysDate}")

# print(datetime.today(), 'after today', datetime.now(), 'after now', datetime.now().time())
