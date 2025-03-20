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

## Applications of Binary & Logic Gates
✅ **Arithmetic Operations** (Addition, Subtraction, Multiplication)  
✅ **Digital Circuits** (CPUs, Memory, ALU)  
✅ **Decision Making in AI**  
✅ **Cryptography & Security Systems**  

---

