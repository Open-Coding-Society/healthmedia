---
layout: post
title: Binary Math Lesson
permalink: /binarymath/
---
{% include healthmediatheme.html %}

# Binary Base-2 Math & Logic Gates  

## Introduction to Binary (Base-2)

Binary is a number system that only uses **two digits**:  
- `0` (Off)  
- `1` (On)  

It is the fundamental language of computers, where every piece of data is stored and processed as combinations of 0s and 1s.

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

## Applications of Binary 
✅ **Arithmetic Operations** (Addition, Subtraction, Multiplication)  
✅ **Digital Circuits** (CPUs, Memory, ALU)  
✅ **Decision Making in AI**  
✅ **Cryptography & Security Systems**  

- Binary is the foundation of modern technology, enabling data storage in computers and smartphones, powering internet communication, encoding information on storage devices, and driving AI decision-making through logical operations.


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
