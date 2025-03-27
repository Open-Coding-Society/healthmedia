---
layout: post
title: BI 3 Logic Gates
permalink: teamteach/logicgates
authors: Claire Lee, Travis Callow, Mihir Thaha
---
{% include healthmediatheme.html %}

## What are Logic Gates?
Logic gates are electronic devices that perform **Boolean operations**. They receive one or more binary inputs (`0` or `1`) and produce a single binary output. These gates form the foundation of all digital systems, including computers, mobile devices, and other technologies. 

---

## Types 
In digital circuits, the most common logic gates are:

- **AND Gate:** Produces `1` only when **both inputs** are `1`.
- **OR Gate:** Produces `1` when **at least one input** is `1`.
- **NOT Gate:** Inverts the input (turns `1` into `0` and `0` into `1`).
- **NAND Gate:** The inverse of the AND gate.
- **NOR Gate:** The inverse of the OR gate.
- **XOR Gate:** Produces `1` when the inputs are **different**.
- **XNOR Gate:** Produces `1` when the inputs are **the same**.

![Image](https://github.com/user-attachments/assets/09b0c48f-784e-4c49-a2bb-4f14ebf3e8bc)

---

### 1. AND Gate (&&)
If inputs are the *same*, *AND* returns the same output. If both inputs are `1`, then the output returns `1`(true). 
Else, it returns `0`(false).

| A | B | Output (A AND B) |
|---|---|-----------------|
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

**Boolean Expression**: `A ⋅ B`
**Impact** --> Authorization process (keycard *AND* PIN required)  

![Image](https://github.com/user-attachments/assets/d71eab7d-caea-46df-a577-b7562bb2380f)

---

### 2. OR Gate (||)
If at least one output is `1`,**OR* returns `1`.
Else `0`.

| A | B | Output (A OR B) |
|---|---|----------------|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 1 |

**Boolean Expression**: `A + B`
**Impact** --> Automatic door activation (motion sensor *OR* button press)

![Image](https://github.com/user-attachments/assets/7ac28546-1bdd-465e-ac7d-49f078469d19)

---

### 3. NOT Gate (!A)
Inverts the input. If the input is `1`, *NOT* returns `0`, and vice versa. 

| A | Output (NOT A) |
|---|---------------|
| 0 | 1 |
| 1 | 0 |

**Boolean Expression**: `Ā`
**Impact** --> Thermostat system (when temperature threshold is reached, *NOT* signals to turn off)

![Image](https://github.com/user-attachments/assets/2f57b4f9-8998-48b2-80b2-1fc41d378f56)

---

### 4. NAND & NOR Gates
- **NAND** (`NOT AND`): Inverts *AND* gate output. 
- **NOR** (`NOT OR`): Inverts *OR* gate output. 

| A | B | NAND (¬(A ⋅ B)) | NOR (¬(A + B)) |
|---|---|---------------|--------------|
| 0 | 0 | 1 | 1 |
| 0 | 1 | 1 | 0 |
| 1 | 0 | 1 | 0 |
| 1 | 1 | 0 | 0 |

- **NAND & NOR are universal gates** - any circuit can be built using only NAND or only NOR gates.
**Impact** --> Self-driving cars (whether to break or steer from conditions)  

![Image](https://github.com/user-attachments/assets/c72b868e-917c-4b4b-97a6-d1f04395d2d0)

---

### 5. XOR Gate (⊕)
The output is `1`(true) if inputs are *different*. If inputs are the same, *XOR* returns `0`(false).

| A | B | Output (A XOR B) |
|---|---|-----------------|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

**Boolean Expression**: `A ⊕ B`
**Impact** --> Computer memory (whether data is the *same* or *different*) 

![Image](https://github.com/user-attachments/assets/770543d7-f7cc-463d-94d4-e8c37f429fb0)

---
### 6. XNOR Gate (⊙)
The XNOR (Exclusive NOR) gate is the *opposite of XOR*.
The output is `1` when *both inputs are the same*.

| A | B | Output (A XNOR B) |
|---|---|---------------|
| 0 | 0 | 1 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

**Boolean Expression**: `A ⊙ B = ĀB + A B̄ = ¬(A ⊕ B)`
**Impact** --> Pattern recognition (evaluate similarities)

![Image](https://github.com/user-attachments/assets/17b41d37-3b70-4d6b-ada3-d8c87c4b1125)

---

## Boolean Algebra & Simplification
Logic circuits can often be *simplified** using Boolean algebra, making them **more efficient*.


### **De Morgan’s Theorems**
\[
\overline{A \cdot B} = \overline{A} + \overline{B}
\]
\[
\overline{A + B} = \overline{A} \cdot \overline{B}
\]

---

## Popcorn Hacks

### Hack #1: Authorization
**Task**: Implement a Python function that simulates a secure entry system using an *AND* gate.

```python
def secure_entry_system(keycard, pin):
    def AND(a, b):
        return a & b  # AND logic


    return AND(keycard, pin)

# Test cases
print(secure_entry_system(1, 1))  # Expected Output: 1 (Access Granted)
print(secure_entry_system(0, 1))  # Expected Output: 0 (Access Denied)
```


### Hack 2: Security system
**Task**: Implement a burglar alarm that activates if a door is forced open OR a window is broken, unless manually disabled.

```python
def burglar_alarm(door, window, alarm_disabled):
    def OR(a, b):
        return a | b


    def NOT(a):
        return 1 if a == 0 else 0


    def AND(a, b):
        return a & b


    alarm_triggered = AND(OR(door, window), NOT(alarm_disabled))
    return "Alarm ON" if alarm_triggered else "Alarm OFF"

# Test cases
print(burglar_alarm(1, 0, 0))  # Expected Output: Alarm ON
print(burglar_alarm(0, 0, 1))  # Expected Output: Alarm OFF (Manually Disabled)
```


### Hack #3: Traffic Light Controller
**Task**: Implement a traffic light controller that turns green only if no cars are present AND no pedestrian button is pressed.

```python
def traffic_light(cars_cross_street, pedestrian_button):
    def NAND(a, b):
        return not (a and b)


    def NOR(a, b):
        return not (a or b)


    green_light = NOR(cars_cross_street, pedestrian_button)
    return "Green Light" if green_light else "Red Light"

# Test cases
print(traffic_light(0, 0))  # Expected Output: Green Light
print(traffic_light(1, 0))  # Expected Output: Red Light
```

### Extra Credit Hack
**Task**: Think of your own system to create with minimal code using any of the logic gates! 

### Homework Submission
Submit your homework on [here](https://docs.google.com/forms/d/e/1FAIpQLSfhYjzZPqp9BeAGxF6gtZujIi1niikv8NR68jeFasxzC648pg/viewform?usp=header). There are also MCQ questions to test your acquired logic gates knowledge. 
