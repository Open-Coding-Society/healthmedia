---
layout: post
title: Binary Math Lesson
permalink: /binarymath/
---


# Binary Base-2 Math & Logic Gates  



## Introduction to Binary (Base-2)

Binary is a number system that only uses **two digits**:  
- `0` (Off)  
- `1` (On)  

It is the fundamental language of computers, where every piece of data is stored and processed as combinations of 0s and 1s.

---

## Binary Number System

Each place in a binary number represents a power of **2**, starting from `2^0` on the right.

Start from the rightmost digit (smallest place).

Each digit is multiplied by 2^position (position starts at 0 on the right).

Add them up!

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


## Binary Addition


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





## Binary Subtraction

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


```py
def binary_subtraction(bin1, bin2):
    # Make sure both binaries have the same length
    max_len = max(len(bin1), len(bin2))
    bin1 = bin1.zfill(max_len)
    bin2 = bin2.zfill(max_len)

    result = ''
    borrow = 0

    # Subtract from right to left
    for i in range(max_len-1, -1, -1):
        bit1 = int(bin1[i])
        bit2 = int(bin2[i])

        sub = bit1 - bit2 - borrow

        if sub == 0 or sub == 1:
            result = str(sub) + result
            borrow = 0
        elif sub == -1:
            result = '1' + result
            borrow = 1  # Pop left
        elif sub == -2:
            result = '0' + result
            borrow = 1  # Pop left

    # Remove leading zeros
    result = result.lstrip('0') or '0'
    return result

# --- DRIVER CODE FOR STUDENTS ---
print("Binary Subtraction Practice 🖥️")
bin1 = input("Enter the first binary number: ")
bin2 = input("Enter the second binary number: ")

# Make sure first number is bigger or equal
if int(bin1, 2) < int(bin2, 2):
    print("First number must be greater than or equal to second number!")
else:
    answer = binary_subtraction(bin1, bin2)
    print(f"{bin1} - {bin2} = {answer}")
```


---

## Logic Gates & Boolean Algebra

Logic gates are the building blocks of digital circuits, controlling how computers make decisions.

### 1. AND Gate (&&)

The output is `1` **only** if both inputs are `1`.

| A | B | Output (A AND B) |
|---|---|-----------------|
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

**Boolean Expression**: `A ⋅ B`

---

### 2. OR Gate (||)

The output is `1` if **at least one** input is `1`.

| A | B | Output (A OR B) |
|---|---|----------------|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 1 |

**Boolean Expression**: `A + B`

---

### 3. NOT Gate (!A)

The NOT gate **inverts** the input.

| A | Output (NOT A) |
|---|---------------|
| 0 | 1 |
| 1 | 0 |

**Boolean Expression**: `Ā`

---

### 4. XOR Gate (⊕)

The output is `1` if inputs are **different**.

| A | B | Output (A XOR B) |
|---|---|-----------------|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

**Boolean Expression**: `A ⊕ B`

---

### 5. NAND & NOR Gates

- **NAND** (`NOT AND`): Inverts the AND gate output.
- **NOR** (`NOT OR`): Inverts the OR gate output.

| A | B | NAND (¬(A ⋅ B)) | NOR (¬(A + B)) |
|---|---|---------------|--------------|
| 0 | 0 | 1 | 1 |
| 0 | 1 | 1 | 0 |
| 1 | 0 | 1 | 0 |
| 1 | 1 | 0 | 0 |

---

**Partner Activity**


"Imagine you are designing a tiny robot brain. You can only use AND, OR, and NOT gates. Your robot must decide whether to turn ON (1) or OFF (0) based on two sensor inputs, A and B."

With your partner, figure out:

If A = 1 and B = 0, what is the output for this logic?
➔ (A AND B) OR (NOT B)



## Applications of Binary 
✅ **Arithmetic Operations** (Addition, Subtraction, Multiplication)  
✅ **Digital Circuits** (CPUs, Memory, ALU)  
✅ **Decision Making in AI**  
✅ **Cryptography & Security Systems**  

- Binary is the foundation of modern technology, enabling data storage in computers and smartphones, powering internet communication, encoding information on storage devices, and driving AI decision-making through logical operations.




## AP MC QUESTIONS:



**Question 28:**


A text-editing application uses binary sequences to represent each of 200 different characters. What is the minimum number of bits needed to assign a unique bit sequence to each of the possible characters?

- A) 4
- B) 6
- C) 7
- D) 8


**Answer:** D  

This option is correct. Using 8 bits will allow for up to 256 characters (2^8 = 256).



**Question 36:**

A computer program performs the operation 2 divided by 3 and represents the result as the value 0.6666666667. Which of the following best explains this result?

- A) An overflow error occurred.
- B) The precision of the result is limited due to the constraints of using a floating-point representation.
- C) The program attempted to execute the operation with the arguments in reverse order.
- D) The program attempted to represent a floating-point number as an integer.

**Answer:** B  

This option is correct. The fixed number of bits used to represent real numbers (as floating-point numbers) limits the range of floating-point values.



**Question 42:**

Internet protocol version 4 (IPv4) represents each IP address as a 32-bit binary number. Internet protocol version 6 (IPv6) represents each IP address as a 128-bit binary number.  
Which of the following best describes the result of using 128-bit addresses instead of 32-bit addresses?

- A) 4 times as many addresses are available.
- B) 96 times as many addresses are available.
- C) 2 to the fourth power times as many addresses are available.
- D) 2 raised to the ninety-sixth power times as many addresses are available.

**Answer:** D  
This option is correct. With 32-bit addressing, IPv4 has 2^32 possible addresses. With 128-bit addressing, IPv6 has 2^128 possible addresses, which is 2^96 times as many.



**Question 44:**

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






## HW HACK


```PY
def binary_addition(a, b):
    return bin(int(a, 2) + int(b, 2))[2:]

def binary_subtraction(a, b):
    if int(a, 2) < int(b, 2):
        return "Error: cannot subtract larger from smaller."
    return bin(int(a, 2) - int(b, 2))[2:]

def decimal_to_binary(n):
    return bin(n)[2:]

def binary_to_decimal(b):
    return int(b, 2)

# --- DRIVER CODE ---
print("Welcome to Binary Bootcamp 🧠")
print("1: Add Binaries\n2: Subtract Binaries\n3: Convert Decimal ➡ Binary\n4: Convert Binary ➡ Decimal")
choice = input("Choose an option (1-4): ")

if choice == '1':
    a = input("Enter first binary: ")
    b = input("Enter second binary: ")
    print("Result:", binary_addition(a, b))
elif choice == '2':
    a = input("Enter first binary: ")
    b = input("Enter second binary: ")
    print("Result:", binary_subtraction(a, b))
elif choice == '3':
    n = int(input("Enter decimal number: "))
    print("Binary:", decimal_to_binary(n))
elif choice == '4':
    b = input("Enter binary number: ")
    print("Decimal:", binary_to_decimal(b))
else:
    print("Invalid choice. Try again.")
```




1. Explain in 1-2 sentences how to convert a binary number into a decimal number.

2. What does borrowing ("pop and drop") mean in binary subtraction?

3. If you are given the binary number 11111111, what decimal number is that?