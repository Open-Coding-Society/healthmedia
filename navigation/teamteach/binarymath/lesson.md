---
layout: post
title: BI 3 Binary Base 2 Math
permalink: binarymath/lesson/
---

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

