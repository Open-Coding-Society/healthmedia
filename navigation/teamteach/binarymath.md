---
layout: post
title: BI 3 Binary Base 2 Math 
permalink: teamteach/binarymath
authors: Michelle Kuruvilla, Rutvik Chavda, Ava S
---

## Introduction to Binary (Base-2)

Binary is a number system that only uses **two digits**: . 
- `0` (Off)  
- `1` (On)  

It is the fundamental language of computers, where every piece of data is stored and processed as combinations of 0s and 1s. Each binary digit (called a bit) represents a power of 2, depending on its position in the sequence. By combining multiple bits, computers can represent and manipulate everything from numbers and letters to complex images and sounds. Larger units like bytes (8 bits) are used to handle more information, enabling all modern technology to work behind the scenes!

[Binary Numbers](https://www.youtube.com/watch?v=zDNaUi2cjv4)


---

## Binary Number System


```
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
```

Pop Quiz For 0.01 extra credit... raise your hand if you think you know:
What would 11 be written in binary according to the pattern above?
---


#### Popcorn Hack 1:  Binary to Decimal Converter


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


----

## Binary Addition

![Image](https://i.ytimg.com/vi/QXJHsqNl824/maxresdefault.jpg)


Adding binary numbers follows simple rules:

Each place in a binary number represents a power of **2**, starting from `2^0` on the right.

Start from the rightmost digit (smallest place).

Each digit is multiplied by 2^position (position starts at 0 on the right).

Add them up!

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

![Image](https://i.ytimg.com/vi/EjUBzGA3DHY/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBSocyaj5A3vvDESoVoS13OxHa4cA)


Binary subtraction follows similar rules but includes **borrowing**:


**Example:**  


```
   1010  (10 in decimal)
-  0111  (7 in decimal)
------------
   0011  (3 in decimal)
```



```py
import random

def binary_subtraction(bin1, bin2):
    max_len = max(len(bin1), len(bin2))
    bin1 = bin1.zfill(max_len)
    bin2 = bin2.zfill(max_len)

    result = ''
    borrow = 0

    for i in range(max_len-1, -1, -1):
        bit1 = int(bin1[i])
        bit2 = int(bin2[i])

        sub = bit1 - bit2 - borrow

        if sub == 0 or sub == 1:
            result = str(sub) + result
            borrow = 0
        elif sub == -1:
            result = '1' + result
            borrow = 1
        elif sub == -2:
            result = '0' + result
            borrow = 1

    result = result.lstrip('0') or '0'
    return result

=print("🧠 Binary Subtraction Challenge! 🧠")
score = 0
total_questions = 3

for question_num in range(1, total_questions + 1):
    num1 = random.randint(8, 63)
    num2 = random.randint(0, num1)

    bin1 = bin(num1)[2:]
    bin2 = bin(num2)[2:]

    print(f"\nProblem {question_num}: {bin1} - {bin2}")
    user_answer = input("Your answer: ").strip()

    correct_answer = binary_subtraction(bin1, bin2)

    if user_answer == correct_answer:
        print("✅ Correct!")
        score += 1
    else:
        print(f"❌ Incorrect. The correct answer was {correct_answer}.")

print(f"\n🎯 You got {score}/{total_questions} correct!")
print("Thanks for practicing!")
```



---

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




**Question 36:**

A computer program performs the operation 2 divided by 3 and represents the result as the value 0.6666666667. Which of the following best explains this result?

- A) An overflow error occurred.
- B) The precision of the result is limited due to the constraints of using a floating-point representation.
- C) The program attempted to execute the operation with the arguments in reverse order.
- D) The program attempted to represent a floating-point number as an integer.



**Question 42:**

Internet protocol version 4 (IPv4) represents each IP address as a 32-bit binary number. Internet protocol version 6 (IPv6) represents each IP address as a 128-bit binary number.  
Which of the following best describes the result of using 128-bit addresses instead of 32-bit addresses?

- A) 4 times as many addresses are available.
- B) 96 times as many addresses are available.
- C) 2 to the fourth power times as many addresses are available.
- D) 2 raised to the ninety-sixth power times as many addresses are available.




**Question 44:**

A computer program uses 4 bits to represent nonnegative integers. Which of the following statements describe a possible result when the program uses this number representation?

I. The operation 4 plus 8 will result in an overflow error.  
II. The operation 7 plus 10 will result in an overflow error.  
III. The operation 12 plus 3 will result in an overflow error.

- A) I only
- B) II only
- C) II and III only
- D) I, II, and III



<details>
  <summary>Click here to see the answers</summary>
  
  **Question 28:**
  - Answer: D) 8 bits
  
  **Question 36:**
  - Answer: B) The precision of the result is limited due to the constraints of using a floating-point representation.
  
  **Question 42:**
  - Answer: D) 2 raised to the ninety-sixth power times as many addresses are available.
  
  **Question 44:**
  - Answer: D) I, II, and III
</details>




---

## Conclusion



By mastering binary math and logic gates, you are building the foundation for understanding how computers process data, perform calculations, and make decisions. These concepts are essential not only for programming and circuit design but also for the AP exam, where you'll apply this knowledge to solve real-world problems and analyze algorithms. The hands-on practice with binary operations and logic gates will strengthen your problem-solving skills, which are crucial for both the exam and future computer science courses.


## HW HACK


```PY
import random
import time

def binary_addition(a, b):
    return bin(int(a, 2) + int(b, 2))[2:]

def binary_subtraction(a, b):
    if int(a, 2) < int(b, 2):
        return "Error"
    return bin(int(a, 2) - int(b, 2))[2:]

def decimal_to_binary(n):
    return bin(n)[2:]

def binary_to_decimal(b):
    return int(b, 2)

def binary_battle_royale():
    print("👾 Welcome to Binary Battle Royale! 👾")
    score = 0
    total_rounds = 3

    for round_num in range(1, total_rounds + 1):
        print(f"\n⚡ Round {round_num} ⚡")
        mode = random.choice(["addition", "subtraction", "dec_to_bin", "bin_to_dec"])

        if mode == "addition":
            num1 = bin(random.randint(0, 15))[2:]
            num2 = bin(random.randint(0, 15))[2:]
            print(f"Add these two binary numbers: {num1} + {num2}")
            user_answer = input("Your answer (binary): ").strip()
            correct_answer = binary_addition(num1, num2)
            if user_answer == correct_answer:
                print("✅ Correct!")
                score += 1
            else:
                print(f"❌ Incorrect. The correct answer was {correct_answer}.")

        elif mode == "subtraction":
            num1_val = random.randint(8, 31)
            num2_val = random.randint(0, num1_val)
            num1 = bin(num1_val)[2:]
            num2 = bin(num2_val)[2:]
            print(f"Subtract these two binary numbers: {num1} - {num2}")
            user_answer = input("Your answer (binary): ").strip()
            correct_answer = binary_subtraction(num1, num2)
            if user_answer == correct_answer:
                print("✅ Correct!")
                score += 1
            else:
                print(f"❌ Incorrect. The correct answer was {correct_answer}.")

        elif mode == "dec_to_bin":
            decimal_number = random.randint(0, 31)
            print(f"Convert this decimal number to binary: {decimal_number}")
            user_answer = input("Your answer (binary): ").strip()
            correct_answer = decimal_to_binary(decimal_number)
            if user_answer == correct_answer:
                print("✅ Correct!")
                score += 1
            else:
                print(f"❌ Incorrect. The correct answer was {correct_answer}.")

        elif mode == "bin_to_dec":
            binary_number = bin(random.randint(0, 31))[2:]
            print(f"Convert this binary number to decimal: {binary_number}")
            user_answer = input("Your answer (decimal): ").strip()
            correct_answer = str(binary_to_decimal(binary_number))
            if user_answer == correct_answer:
                print("✅ Correct!")
                score += 1
            else:
                print(f"❌ Incorrect. The correct answer was {correct_answer}.")

    print("\n🏆 Game Over! 🏆")
    print(f"Your final score: {score}/{total_rounds}")
    if score == total_rounds:
        print("🌟 Amazing job! You're a Binary Master!")
    elif score >= total_rounds // 2:
        print("👍 Good effort! Keep practicing!")
    else:
        print("💡 Don't worry — review the rules and try again!")

# --- Start the game ---
binary_battle_royale()
```




1. Explain in 1-2 sentences how to convert a binary number into a decimal number.


2. If you are given the binary number 11111111, what decimal number is that?