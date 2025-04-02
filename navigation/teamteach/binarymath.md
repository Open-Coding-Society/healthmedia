---
layout: post
title: BI 3 Binary Base 2 Math 
permalink: teamteach/binarymath
authors: Michelle Kuruvilla, Rutvik Chavda, Ava S
---

# Binary Base-2 Math 

## Introduction to Binary (Base-2)

Binary is a number system that only uses **two digits**:  
- `0` (Off)  
- `1` (On)  

It is the fundamental language of computers, where every piece of data is stored and processed as combinations of 0s and 1s.

[![Binary](https://img.youtube.com/vi/sXxwr66Y79Y/0.jpg)](https://www.youtube.com/watch?v=sXxwr66Y79Y)


---

## Binary Number System

Each place in a binary number represents a power of **2**, starting from `2^0` on the right.

| Decimal (Base-10) | Binary (Base-2) |
|------------------|----------------|
| 0 | `0` |
| 1 | `1` |
| 2 | `10` |
| 3 | `11` |
| 4 | `100` |
| 5 | `101` |
| 6 | `110` |
| 7 | `111` |
| 8 | `1000` |
| 9 | `1001` |
| 10 | `1010` |

---

## Binary Addition

![Image](https://i.ytimg.com/vi/QXJHsqNl824/maxresdefault.jpg)


Adding binary numbers follows simple rules:

| A | B | Sum | Carry |
|---|---|-----|-------|
| 0 | 0 |  0  |  0    |
| 0 | 1 |  1  |  0    |
| 1 | 0 |  1  |  0    |
| 1 | 1 |  0  |  1    |

**Example:**  
```
   1011  (11 in decimal)
+  1101  (13 in decimal)
------------
  11000  (24 in decimal)
```

---

## Binary Subtraction

![Image](https://i.ytimg.com/vi/EjUBzGA3DHY/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBSocyaj5A3vvDESoVoS13OxHa4cA)


Binary subtraction follows similar rules but includes **borrowing**:

| A | B | Difference | Borrow |
|---|---|-----------|--------|
| 0 | 0 |  0        |  0     |
| 0 | 1 |  1        |  1     |
| 1 | 0 |  1        |  0     |
| 1 | 1 |  0        |  0     |

**Example:**  
```
   1010  (10 in decimal)
-  0111  (7 in decimal)
------------
   0011  (3 in decimal)
```

---

## Applications of Binary 
✅ **Arithmetic Operations** (Addition, Subtraction, Multiplication)  
✅ **Digital Circuits** (CPUs, Memory, ALU)  
✅ **Decision Making in AI**  
✅ **Cryptography & Security Systems**  

- Binary is the foundation of modern technology, enabling data storage in computers and smartphones, powering internet communication, encoding information on storage devices, and driving AI decision-making through logical operations.

## AP MC QUESTIONS:


## 2018 MC


Question 28:


A text-editing application uses binary sequences to represent each of 200 different characters. What is the minimum number of bits needed to assign a unique bit sequence to each of the possible characters?

- A) 4
- B) 6
- C) 7
- D) 8

**Answer:** D  
This option is correct. Using 8 bits will allow for up to 256 characters (2^8 = 256).

Question 36:

A computer program performs the operation 2 divided by 3 and represents the result as the value 0.6666666667. Which of the following best explains this result?

- A) An overflow error occurred.
- B) The precision of the result is limited due to the constraints of using a floating-point representation.
- C) The program attempted to execute the operation with the arguments in reverse order.
- D) The program attempted to represent a floating-point number as an integer.

**Answer:** B  
This option is correct. The fixed number of bits used to represent real numbers (as floating-point numbers) limits the range of floating-point values.

Question 42: 

Internet protocol version 4 (IPv4) represents each IP address as a 32-bit binary number. Internet protocol version 6 (IPv6) represents each IP address as a 128-bit binary number.  
Which of the following best describes the result of using 128-bit addresses instead of 32-bit addresses?

- A) 4 times as many addresses are available.
- B) 96 times as many addresses are available.
- C) 2 to the fourth power times as many addresses are available.
- D) 2 raised to the ninety-sixth power times as many addresses are available.

**Answer:** D  
This option is correct. With 32-bit addressing, IPv4 has 2^32 possible addresses. With 128-bit addressing, IPv6 has 2^128 possible addresses, which is 2^96 times as many.

Question 44:

A computer program uses 4 bits to represent nonnegative integers. Which of the following statements describe a possible result when the program uses this number representation?

I. The operation 4 plus 8 will result in an overflow error.  
II. The operation 7 plus 10 will result in an overflow error.  
III. The operation 12 plus 3 will result in an overflow error.

- A) I only
- B) II only
- C) II and III only
- D) I, II, and III

**Answer:** D  
This option is correct. With 4 bits, the maximum value that can be represented is 15 (binary 1111). Any operation resulting in a sum greater than 15 will cause an overflow.

## 2020 MC
---

## Conclusion

Binary numbers and logic gates **form the foundation of computing**! Mastering them will help you understand **programming, circuits, and AI logic**.

**Next Steps:**  
 


#### Popcorn Hack 1:  Binary to Decimal Converter



# Binary to Decimal Converter

```python
def binary_to_decimal(binary_str):
    decimal = 0
    for i in range(len(binary_str)):
        decimal += int(binary_str[-(i + 1)]) * (2 ** i)
    return decimal

#Get user input
binary_input = input("Enter a binary number: ")
decimal_output = binary_to_decimal(binary_input)
print(f"The decimal representation of {binary_input} is {decimal_output}.")
```





#### Popcorn Hack 2: Binary Addition Battle

How it works:

Step 1: The game randomly generates two binary numbers (between 0 and 255).
Step 2: The user has to add these binary numbers and input the result.
Step 3: The game checks if the result is correct and measures how fast the user solved it, providing feedback and points based on performance.

```python
import random
import time

def binary_addition_battle():
    # Generate two random binary numbers (up to 8 bits)
    num1 = bin(random.randint(0, 255))[2:]
    num2 = bin(random.randint(0, 255))[2:]
    
    # Show the binary numbers
    print(f"Add the following binary numbers:")
    print(f"Number 1: {num1}")
    print(f"Number 2: {num2}")
    
    # Start the timer
    start_time = time.time()
    
    # Ask the user for the sum
    user_answer = input("Your answer (in binary): ")
    
    # End the timer
    end_time = time.time()
    
    # Calculate the correct binary sum
    correct_answer = bin(int(num1, 2) + int(num2, 2))[2:]
    
    # Check if the answer is correct
    if user_answer == correct_answer:
        print(f"Correct! You took {end_time - start_time:.2f} seconds.")
        print(f"Your score: +10 points!")
    else:
        print(f"Oops! The correct answer was {correct_answer}.")
        print(f"Your score: -5 points.")

# Run the game
binary_addition_battle()
```


How it Works:

Students will be given a random decimal number to convert into binary, and a random binary number to convert into decimal.
They have to answer as fast as possible, and if they are correct, they get a point.


example 

111010
+ 1110111
-----------
  10110001

0 + 1 = 1 (No carry)
1 + 1 = 10 → write 0 and carry 1.
0 + 1 + 1 (carry) = 10 → write 0 and carry 1.
1 + 0 + 1 (carry) = 10 → write 0 and carry 1.
1 + 1 + 1 (carry) = 11 → write 1 and carry 1.
1 + 1 + 1 (carry) = 11 → write 1 and carry 1.
Finally, there's a carry of 1 left, so we write it down.


#### Popcorn Hack #3

```python
import random
import time

def decimal_to_binary(decimal_num):
    return bin(decimal_num)[2:]

def binary_to_decimal(binary_str):
    return int(binary_str, 2)

def conversion_race():
    print("Welcome to the Binary Conversion Race! Convert as fast as you can!")

    # Decimal to Binary Challenge
    decimal_num = random.randint(1, 100)
    print(f"\nChallenge 1: Convert the following decimal number to binary:")
    print(f"Decimal: {decimal_num}")
    start_time = time.time()
    user_answer = input("Your answer in binary: ")
    end_time = time.time()

    if user_answer == decimal_to_binary(decimal_num):
        print("Correct!")
    else:
        print(f"Oops! The correct binary is {decimal_to_binary(decimal_num)}.")

    time.sleep(1)

    # Binary to Decimal Challenge
    binary_num = bin(random.randint(1, 100))[2:]
    print(f"\nChallenge 2: Convert the following binary number to decimal:")
    print(f"Binary: {binary_num}")
    start_time = time.time()
    user_answer = int(input("Your answer in decimal: "))
    end_time = time.time()

    if user_answer == binary_to_decimal(binary_num):
        print("Correct!")
    else:
        print(f"Oops! The correct decimal is {binary_to_decimal(binary_num)}.")

    print("\nRace finished!")

#Run the race
conversion_race()
```







#### Example Output for Hack 1


<img src="{{site.baseurl}}/images/q.png" alt="ex">


#### Example Output for Hack 2

<img src="{{site.baseurl}}/images/l.png" alt="ex">

<a href="https://docs.google.com/forms/d/e/1FAIpQLSciyNyFSSK6VAL27Q-yr4XM_jt3bzu9sxOHhDC4rEdLCN78og/viewform" style="color:black;">Click here to fill out the form</a>





