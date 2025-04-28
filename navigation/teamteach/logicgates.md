---
layout: post
title: BI 3 Logic Gates
permalink: teamteach/logicgates
authors: Claire Lee, Travis Callow, Mihir Thaha
---

## What are Logic Gates?
Logic gates are electronic devices that perform Boolean operations. They receive one or more binary inputs (`0` or `1`) and produce a single binary output. These gates form the foundation of all digital systems, including computers, mobile devices, and other technologies. 

<iframe width="300" height="500" 
    src="https://www.youtube.com/embed/JvAyNhiJBCM?si=HlhpZgbFpPLwYac3" 
  title="Logic Gates: Minecraft" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
  allowfullscreen>
</iframe>

---

## Types 
In digital circuits, the most common logic gates are:

- **AND Gate:** Produces `1` only when both inputs are `1`.
- **OR Gate:** Produces `1` when at least one input is `1`.
- **NOT Gate:** Inverts the input (turns `1` into `0` and `0` into `1`).
- **NAND Gate:** The inverse of the AND gate.
- **NOR Gate:** The inverse of the OR gate.
- **XOR Gate:** Produces `1` when the inputs are different.
- **XNOR Gate:** Produces `1` when the inputs are the same.

Their symbols include: 

<table>
  <tr>
    <th>Logic Gate</th>
    <th>Symbol</th>
    <th>Basic Operation</th>
    <th>DeMorgan's Equivalent</th>
  </tr>
  <tr>
    <td>AND</td>
    <td>A ∧ B</td>
    <td>True if both A and B are true</td>
    <td>¬(¬A ∨ ¬B)</td>
  </tr>
  <tr>
    <td>OR</td>
    <td>A ∨ B</td>
    <td>True if either A or B is true</td>
    <td>¬(¬A ∧ ¬B)</td>
  </tr>
  <tr>
    <td>NOT</td>
    <td>¬A</td>
    <td>Flips true ↔ false</td>
    <td>(no change)</td>
  </tr>
  <tr>
    <td>NAND</td>
    <td>¬(A ∧ B)</td>
    <td>Opposite of AND</td>
    <td>(NOT A) OR (NOT B) → ¬A ∨ ¬B</td>
  </tr>
  <tr>
    <td>NOR</td>
    <td>¬(A ∨ B)</td>
    <td>Opposite of OR</td>
    <td>(NOT A) AND (NOT B) → ¬A ∧ ¬B</td>
  </tr>
  <tr>
    <td>XOR (Exclusive OR)</td>
    <td>A ⊕ B</td>
    <td>True if only one is true</td>
    <td>(A ∧ ¬B) ∨ (¬A ∧ B)</td>
  </tr>
  <tr>
    <td>XNOR (Exclusive NOR)</td>
    <td>¬(A ⊕ B)</td>
    <td>True if both are same</td>
    <td>(A ∧ B) ∨ (¬A ∧ ¬B)</td>
  </tr>
</table>

`0` --> FALSE<br>
`1` --> TRUE<br>

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

**Boolean Expression**: `A ⋅ B`<br>
**Impact** --> Authorization process (keycard *AND* PIN required)<br>

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

**Boolean Expression**: `A + B`<br>
**Impact** --> Automatic door activation (motion sensor *OR* button press)<br>

![Image](https://github.com/user-attachments/assets/7ac28546-1bdd-465e-ac7d-49f078469d19)

---

### 3. NOT Gate (!A)
Inverts the input. If the input is `1`, *NOT* returns `0`, and vice versa. 

| A | Output (NOT A) |
|---|---------------|
| 0 | 1 |
| 1 | 0 |

**Boolean Expression**: `Ā`<br>
**Impact** --> Thermostat system (when temperature threshold is reached, *NOT* signals to turn off)<br>

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

- **NAND & NOR are universal gates** - any circuit can be built using only NAND or only NOR gates.<br>
**Impact** --> Self-driving cars (whether to break or steer from conditions)<br>

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

**Boolean Expression**: `A ⊕ B`<br>
**Impact** --> Computer memory (whether data is the *same* or *different*)<br>

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

**Boolean Expression**: `A ⊙ B = ĀB + A B̄ = ¬(A ⊕ B)`<br>
**Impact** --> Pattern recognition (evaluate similarities)<br>

![Image](https://github.com/user-attachments/assets/17b41d37-3b70-4d6b-ada3-d8c87c4b1125)

---

## Boolean Algebra & Simplification
Logic circuits can often be simplified using Boolean algebra, making them more efficient.


### **De Morgan’s Theorems**

 **First Law**: ¬(A ∧ B) = (¬A) ∨ (¬B)<br>
 **Second Law**: ¬(A ∨ B) = (¬A) ∧ (¬B)<br>

---
## Popcorn Hack
**What are methods of real-world purpose that using logic gates can implement? Explain deeper if using our listed impacts, explaining why this impact is helpful.**
---
## Homework Hack: Authorization System
**Task**: Fill in the missing code necessary to implement a Python function that simulates a secure entry system using an *AND* gate.<br>

**Template**:
```python
def secure_entry_system(keycard, pin):
    # MISSING: Implement the AND logic (hint: both a and b must be true)
        

    # MISSING: Return the result of ANDing keycard and pin
    

# Test cases
print(secure_entry_system(1, 1))  # Expected Output: 1 (Access Granted)
print(secure_entry_system(0, 1))  # Expected Output: 0 (Access Denied)
```

### Extra Credit Hack (capped at .95/1)
**Task**: Think of your own system using Python to create with minimal code using any of the logic gates! 

### Homework Submission
<p>Submit your popcorn and homework hacks <a href="https://docs.google.com/forms/d/e/1FAIpQLSfhYjzZPqp9BeAGxF6gtZujIi1niikv8NR68jeFasxzC648pg/viewform?usp=header" style="color: blue;">here</a>. There are also MCQ questions to test your acquired logic gates knowledge.</p>
