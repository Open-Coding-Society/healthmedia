---
layout: post
title: BI 3 Logic Gates
permalink: teamteach/logicgates
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

---

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

### 4. NAND & NOR Gates
- **NAND** (`NOT AND`): Inverts the AND gate output.
- **NOR** (`NOT OR`): Inverts the OR gate output.

| A | B | NAND (¬(A ⋅ B)) | NOR (¬(A + B)) |
|---|---|---------------|--------------|
| 0 | 0 | 1 | 1 |
| 0 | 1 | 1 | 0 |
| 1 | 0 | 1 | 0 |
| 1 | 1 | 0 | 0 |

- **NAND & NOR are universal gates** - any circuit can be built using only NAND or only NOR gates.
- **Challenge:** Try building **AND, OR, and XOR using only NAND gates**.
---

### 5. XOR Gate (⊕)
The output is `1` if inputs are **different**.

| A | B | Output (A XOR B) |
|---|---|-----------------|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

**Boolean Expression**: `A ⊕ B`

---
### 6. XNOR Gate (⊙)
The XNOR (Exclusive NOR) gate is the **opposite of XOR**.
The output is `1` when **both inputs are the same**,

| A | B | Output (A XNOR B) |
|---|---|---------------|
| 0 | 0 | 1 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

**Boolean Expression**: `A ⊙ B = ĀB + A B̄ = ¬(A ⊕ B)`

---

## Real-World Applications of Logic Gates
✅ **AND** → Security systems (keycard **AND** PIN required)  
✅ **OR** → Automatic doors (motion sensor **OR** button press)  
✅ **XOR** → **Parity bits** for error detection in networking  
✅ **NAND/NOR** → **Memory storage** (SR Latch, Flip-Flops)  


---


## Boolean Algebra & Simplification
Logic circuits can often be **simplified** using Boolean algebra, making them **more efficient**.


### **De Morgan’s Theorems**
\[
\overline{A \cdot B} = \overline{A} + \overline{B}
\]
\[
\overline{A + B} = \overline{A} \cdot \overline{B}
\]


---


## Interactive Coding Challenges 💡


### 🍿 Hack #1: Secure Entry System Using Logic Gates
🔧 **Task**: Implement a Python function that simulates a **secure entry system** using an **AND gate**.


```python
def secure_entry_system(keycard, pin):
    def AND(a, b):
        return a & b  # AND logic


    return AND(keycard, pin)


# Test cases
print(secure_entry_system(1, 1))  # ✅ Expected Output: 1 (Access Granted)
print(secure_entry_system(0, 1))  # ❌ Expected Output: 0 (Access Denied)
```


### 🍿 Hack 2: Burglar Alarm System (OR & NOT Logic)
🔧 **Task**: Implement a burglar alarm that activates if a door is forced open OR a window is broken, unless manually disabled.


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
print(burglar_alarm(1, 0, 0))  # ✅ Expected Output: Alarm ON
print(burglar_alarm(0, 0, 1))  # ❌ Expected Output: Alarm OFF (Manually Disabled)
```


**Your Challenge**: Add a motion detector (D) that when only when triggred will set off the alarm.


### 🍿 Hack #3: Smart Traffic Light Controller (NAND & NOR Logic)


🔧 **Task**: Implement a traffic light controller that turns green only if no cars are present AND no pedestrian button is pressed.


```python
def traffic_light(cars_cross_street, pedestrian_button):
    def NAND(a, b):
        return not (a and b)


    def NOR(a, b):
        return not (a or b)


    green_light = NOR(cars_cross_street, pedestrian_button)
    return "Green Light" if green_light else "Red Light"


# Test cases
print(traffic_light(0, 0))  # ✅ Expected Output: Green Light
print(traffic_light(1, 0))  # ❌ Expected Output: Red Light
```




### 🍿 Task #3: Smart Traffic Light (NAND & NOR)


🔧 **Scenario**:
A smart traffic light should turn green only if:


No cars are detected on the cross-street (A = 0).
The pedestrian button is NOT pressed (B = 0).
📌 Instructions: Implement a function that determines the light state.


```python
def traffic_light(cars_cross_street, pedestrian_button):
    return not (cars_cross_street or pedestrian_button)  # NOR logic


# Test cases
print(traffic_light(0, 0))  # ✅ Expected: Green Light
print(traffic_light(1, 0))  # ❌ Expected: Red Light
print(traffic_light(0, 1))  # ❌ Expected: Red Light
print(traffic_light(1, 1))  # ❌ Expected: Red Light
```
