---
layout: post
title: BI 3 Logic Gates
permalink: logicgates/lesson/
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

## Applications of Binary & Logic Gates
✅ **Arithmetic Operations** (Addition, Subtraction, Multiplication)  
✅ **Digital Circuits** (CPUs, Memory, ALU)  
✅ **Decision Making in AI**  
✅ **Cryptography & Security Systems**  

---

## Conclusion
Binary numbers and logic gates **form the foundation of computing**! Mastering them will help you understand **programming, circuits, and AI logic**.

**Next Steps:**  
- Try building **truth tables** for complex circuits.  
- Explore **Karnaugh Maps (K-Maps)** for simplifying logic expressions.  
- Learn how transistors implement **logic gates in hardware**.  
```

