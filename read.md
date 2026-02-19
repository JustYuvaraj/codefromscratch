# 🔥 SOLITON C INTERVIEW MASTERGUIDE — Crack 100% of Round 1

> **Read this document once. Understand every example. You WILL crack the C section.**

---

## TABLE OF CONTENTS

1. [Data Types & sizeof](#1-data-types--sizeof)
2. [Number Systems](#2-number-systems)
3. [Type Promotion & Casting](#3-type-promotion--casting)
4. [Pre/Post Increment & Decrement](#4-prepost-increment--decrement)
5. [Operator Precedence & Associativity](#5-operator-precedence--associativity)
6. [Short-Circuit Evaluation](#6-short-circuit-evaluation)
7. [Ternary Operator](#7-ternary-operator)
8. [Comma Operator](#8-comma-operator)
9. [Bitwise Operators](#9-bitwise-operators)
10. [Pointers](#10-pointers)
11. [Arrays & Strings](#11-arrays--strings)
12. [Structures, Unions, Enums](#12-structures-unions-enums)
13. [Structure Padding](#13-structure-padding)
14. [Storage Classes](#14-storage-classes)
15. [Macros & Preprocessor](#15-macros--preprocessor)
16. [const & volatile](#16-const--volatile)
17. [Dynamic Memory](#17-dynamic-memory)
18. [Recursion](#18-recursion)
19. [I/O Buffering](#19-io-buffering)
20. [Endianness](#20-endianness)
21. [Undefined Behavior](#21-undefined-behavior)
22. [50+ Interview Questions](#22-interview-questions)

---

## 1. Data Types & sizeof

### Fundamental Sizes (64-bit machine):

| Type | Size | Range |
|------|------|-------|
| `char` | 1 byte | -128 to 127 (signed) |
| `unsigned char` | 1 byte | 0 to 255 |
| `short` | 2 bytes | -32768 to 32767 |
| `int` | 4 bytes | -2,147,483,648 to 2,147,483,647 |
| `unsigned int` | 4 bytes | 0 to 4,294,967,295 |
| `long` | 4 or 8 bytes | Platform dependent |
| `float` | 4 bytes | ~6 decimal digits precision |
| `double` | 8 bytes | ~15 decimal digits precision |
| `void *` | 8 bytes (64-bit) / 4 bytes (32-bit) | — |

### sizeof Rules:

```c
// sizeof returns size in BYTES
sizeof(char)   = 1    // ALWAYS 1, guaranteed by standard
sizeof(int)    = 4    // on most modern systems
sizeof(float)  = 4
sizeof(double) = 8

// Pointers — ALL pointers are same size
sizeof(int *)    = 8  // on 64-bit
sizeof(char *)   = 8  // same!
sizeof(double *) = 8  // same!
sizeof(void *)   = 8  // same!

// void
sizeof(void)     = 1  // GCC extension, NOT standard! Other compilers = ERROR

// CRITICAL: sizeof does NOT evaluate its argument!
int a = 5;
int b = sizeof(a++);  // a is STILL 5! a++ never executes!
// b = 4 (size of int)
```

### Char Overflow:

```c
// signed char range: -128 to 127
char c = 200;        // overflow! wraps around
printf("%d", c);     // Output: -56 (200 - 256 = -56)

// unsigned char range: 0 to 255
unsigned char c = 200;
printf("%d", c);     // Output: 200 (fits!)

unsigned char c = 256;
printf("%d", c);     // Output: 0 (wraps around: 256 - 256 = 0)
```

### Integer Overflow:

```c
int x = 2147483647;  // INT_MAX
x = x + 1;           // OVERFLOW! Undefined behavior
printf("%d", x);     // Typically: -2147483648 (wraps to INT_MIN)
```

---

## 2. Number Systems

| Prefix | System | Base | Example |
|--------|--------|------|---------|
| None | Decimal | 10 | `12` = 12 |
| `0x` or `0X` | Hexadecimal | 16 | `0x12` = 18 |
| `0` | Octal | 8 | `012` = 10 |
| `0b` (GCC) | Binary | 2 | `0b1010` = 10 |

### Conversion Examples:

```c
int x = 12;    // decimal 12
int y = 0x12;  // hex: 1×16 + 2 = 18
int z = 012;   // octal: 1×8 + 2 = 10

printf("%d %d %d", x, y, z);  // Output: 12 18 10
```

### Common Trap:

```c
int a = 010;   // Looks like 10 but it's OCTAL = 8!
int b = 09;    // ERROR! 9 doesn't exist in octal (0-7 only)
```

---

## 3. Type Promotion & Casting

### Implicit Promotion (automatic):

When different types mix, smaller type promotes to larger:
`char → int → long → float → double`

```c
// int / int = int (decimal LOST!)
13 / 5 = 2        // NOT 2.6!

// double / int = double (int promoted)
13.0 / 5 = 2.6    // int 5 promoted to double 5.0

// Order matters!
int i = 13 / 5 * 4;      // (13/5)*4 = 2*4 = 8
int j = 13.0 / 5 * 4;    // (13.0/5)*4 = 2.6*4 = 10.4 → truncate → 10
int k = 13 / 5 * 4.0;    // (13/5)*4.0 = 2*4.0 = 8.0 → truncate → 8
// j ≠ k because .0 position matters!
```

### Explicit Casting:

```c
int a = 5, b = 2;
float f = (float)a / b;   // 5.0 / 2 = 2.5
float g = (float)(a / b); // (5/2) = 2, then cast → 2.0
```

### Signed vs Unsigned Trap:

```c
unsigned int a = 1;
int b = -1;
if (a > b)
    printf("a is greater");
else
    printf("b is greater");
// Output: "b is greater"!
// Why? b is converted to unsigned → becomes 4294967295 (huge!)
```

---

## 4. Pre/Post Increment & Decrement

### Rules:

| Operator | Name | Action |
|----------|------|--------|
| `a++` | Post-increment | Use current value, THEN add 1 |
| `++a` | Pre-increment | Add 1 FIRST, then use new value |
| `a--` | Post-decrement | Use current value, THEN subtract 1 |
| `--a` | Pre-decrement | Subtract 1 FIRST, then use new value |

### Examples:

```c
int a = 5;
int b = a++;    // b = 5 (used old), a = 6

int a = 5;
int b = ++a;    // a = 6 (incremented first), b = 6

int a = 5;
int b = a++ + 10;  // b = 5+10 = 15, then a = 6
int c = ++a * 2;   // a becomes 7 first, c = 7*2 = 14
```

### In Expressions (SAFE — different variables):

```c
int a = 5, b = 3;
int c = a++ + b++;  // c = 5+3 = 8, then a=6, b=4 ✅ SAFE
```

---

## 5. Operator Precedence & Associativity

### Precedence Table (HIGH to LOW):

| Priority | Operator | Associativity |
|----------|----------|---------------|
| 1 | `()` `[]` `->` `.` `a++` `a--` | Left → Right |
| 2 | `++a` `--a` `!` `~` `*` `&` `sizeof` `(type)` | Right → Left |
| 3 | `*` `/` `%` | Left → Right |
| 4 | `+` `-` | Left → Right |
| 5 | `<<` `>>` | Left → Right |
| 6 | `<` `<=` `>` `>=` | Left → Right |
| 7 | `==` `!=` | Left → Right |
| 8 | `&` (bitwise AND) | Left → Right |
| 9 | `^` (XOR) | Left → Right |
| 10 | `\|` (bitwise OR) | Left → Right |
| 11 | `&&` (logical AND) | Left → Right |
| 12 | `\|\|` (logical OR) | Left → Right |
| 13 | `?:` (ternary) | Right → Left |
| 14 | `=` `+=` `-=` `*=` etc. | Right → Left |
| 15 | `,` (comma) | Left → Right |

### Key Rules:

- `*` `/` `%` come BEFORE `+` `-`
- `&&` comes BEFORE `||` — **Most asked!**
- Ternary `?:` is Right → Left
- Assignment `=` is Right → Left

### Example:

```c
int x = 0, y = 0, z = 1;
x++ || y++ && z++;
// && has higher precedence than ||
// Brackets: x++ || (y++ && z++)
```

---

## 6. Short-Circuit Evaluation

### Rules:

| Operator | If left side is... | Right side... |
|----------|-------------------|---------------|
| `\|\|` (OR) | TRUE (non-zero) | **SKIPPED!** |
| `\|\|` (OR) | FALSE (zero) | Evaluated |
| `&&` (AND) | FALSE (zero) | **SKIPPED!** |
| `&&` (AND) | TRUE (non-zero) | Evaluated |

### Classic Example:

```c
// Case 1: x = 0
int x = 0, y = 0, z = 1;
x++ || (y++ && z++);
// x++ returns 0 (FALSE), x becomes 1
// || left is FALSE → must check right
// y++ returns 0 (FALSE), y becomes 1
// && left is FALSE → SKIP z++
// z stays 1!
// Result: x=1, y=1, z=1

// Case 2: x = 1
int x = 1, y = 0, z = 1;
x++ || (y++ && z++);
// x++ returns 1 (TRUE), x becomes 2
// || left is TRUE → SKIP EVERYTHING on right
// y and z untouched!
// Result: x=2, y=0, z=1
```

---

## 7. Ternary Operator

### Syntax:

```c
result = (condition) ? value_if_TRUE : value_if_FALSE;
```

### Nested Ternary (Right-to-Left Associativity):

```c
// Brackets go from RIGHT:
a == b ? a : b ? ++c : d++
// Becomes:
a == b ? a : (b ? ++c : d++)

// Same as:
if (a == b)
    z = a;
else if (b)
    z = ++c;
else
    z = d++;
```

### Key: Only ONE branch executes — `++`/`--` in skipped branch NEVER runs!

---

## 8. Comma Operator

### Rule: Evaluates ALL expressions, returns ONLY the LAST one.

```c
int x = (1, 2, 3, 4, 5);
printf("%d", x);  // Output: 5

if (a > 3, b > 3)  // Only b > 3 decides the if!
```

---

## 9. Bitwise Operators

### The 6 Operators:

| Operator | Name | Rule | Example (5, 3) |
|----------|------|------|-----------------|
| `&` | AND | Both 1 → 1 | `101 & 011 = 001` = 1 |
| `\|` | OR | Any 1 → 1 | `101 \| 011 = 111` = 7 |
| `^` | XOR | Different → 1 | `101 ^ 011 = 110` = 6 |
| `~` | NOT | Flip all bits | `~5 = -6` |
| `<<` | Left Shift | × 2ⁿ | `5 << 1 = 10` |
| `>>` | Right Shift | ÷ 2ⁿ | `8 >> 1 = 4` |

### Important Tricks:

```c
n & 1           // Check if odd (last bit = 1)
n & (n-1)       // Remove lowest set bit
a ^ a = 0       // XOR with itself = 0
a ^ 0 = a       // XOR with zero = itself
1 << n          // = 2ⁿ
~n = -(n+1)     // NOT formula
```

### Bitwise vs Logical — DON'T CONFUSE!

```c
8 & 4 = 0      // Bitwise: 1000 & 0100 = 0000 = FALSE!
8 && 4 = 1     // Logical: both non-zero = TRUE!
```

---

## 10. Pointers

### Basics:

```c
int a = 100;
int *p = &a;    // p stores address of a

printf("%d", a);    // 100 (value)
printf("%p", &a);   // address of a
printf("%p", p);    // same address (p stores &a)
printf("%d", *p);   // 100 (dereference: go to address, get value)

*p = 200;           // changes a to 200!
```

### Pointer Arithmetic (Scaling Factor):

```c
int *p = (int *)1000;
p + 1 = 1004          // NOT 1001! Scales by sizeof(int) = 4

// Formula: pointer + n = address + n × sizeof(data_type)
// char*: +1 = +1 byte
// int*:  +1 = +4 bytes
// double*: +1 = +8 bytes
```

### Pointer Subtraction:

```c
int a[5];
int *p = &a[0], *q = &a[3];

(int)q - (int)p = 12    // Raw byte difference (3 × 4)
q - p = 3               // Number of elements apart
```

### void Pointer:

```c
void *p;
int a = 10;
p = &a;                  // ✅ Can point to any type
printf("%d", *(int *)p); // Must cast before dereference!
// *p alone → ERROR (compiler doesn't know how many bytes to read)
```

### * and & cancel each other:

```c
int a = 100;
int *p = &a;
*&a = a = 100           // & gets address, * goes there → back to a
**&p = *(*(&p)) = *p = 100
```

### Pointer to Array:

```c
int a[4] = {1,2,3,4};
int (*p)[4] = &a;       // Pointer to ENTIRE array of 4 ints

// p+1 jumps by 4×4 = 16 bytes (entire array size)
// int *q = a; q+1 jumps by 4 bytes (one int)

// DON'T CONFUSE:
int (*p)[4]   // Pointer TO an array of 4 ints
int *p[4]     // Array OF 4 int pointers
```

### Function Pointers:

```c
int add(int a, int b) { return a + b; }

int (*fp)(int, int) = add;   // fp points to add function
printf("%d", fp(3, 4));      // Output: 7
```

---

## 11. Arrays & Strings

### Arrays:

```c
int arr[5] = {1, 2, 3};
// arr[0]=1, arr[1]=2, arr[2]=3, arr[3]=0, arr[4]=0
// Remaining elements auto-initialized to 0!

sizeof(arr) = 20     // 5 × 4 = total array size
sizeof(arr[0]) = 4   // size of one element
// Number of elements = sizeof(arr) / sizeof(arr[0]) = 5

// Array name = pointer to first element
arr == &arr[0]       // TRUE
*(arr + i) == arr[i] // TRUE — same thing!
```

### Strings:

```c
// String = char array ending with '\0' (null terminator)
char s[] = "hello";
// s = {'h','e','l','l','o','\0'} → 6 characters!

sizeof(s) = 6        // includes \0
strlen(s) = 5        // does NOT include \0

// CRITICAL DIFFERENCE:
char s[] = "hello";   // Array on stack, MODIFIABLE
char *s  = "hello";   // Pointer to string literal, READ-ONLY!
s[0] = 'H';           // ✅ OK for array version
s[0] = 'H';           // ❌ CRASH for pointer version (segfault)
```

### 2D Array:

```c
int a[2][3] = {{1,2,3}, {4,5,6}};

a[1][2] = 6
*(*(a + 1) + 2) = 6   // Same thing using pointer notation
// a+1 → row 1, *(a+1) → first element of row 1
// *(a+1)+2 → 3rd element of row 1, dereference → 6
```

---

## 12. Structures, Unions, Enums

### Structure:

```c
struct Student {
    char name[20];
    int age;
    float marks;
};

struct Student s = {"Ram", 20, 85.5};
printf("%s %d %.1f", s.name, s.age, s.marks);

// With pointer:
struct Student *p = &s;
printf("%d", p->age);    // Arrow operator for pointer
```

### Union:

```c
union Data {
    int i;
    float f;
    char c;
};

sizeof(union Data) = 4   // Size of LARGEST member only!
// All members SHARE the same memory!

union Data d;
d.i = 65;
printf("%c", d.c);  // Output: 'A' (ASCII 65) — shares same bytes!
```

### Structure vs Union:

| Feature | struct | union |
|---------|--------|-------|
| Size | Sum of all members + padding | Size of largest member |
| Memory | Each member has own space | All members share space |
| Access | All members valid simultaneously | Only last written member valid |

### Enum:

```c
enum Color { RED, GREEN, BLUE };      // RED=0, GREEN=1, BLUE=2
enum Color { RED=5, GREEN, BLUE };    // RED=5, GREEN=6, BLUE=7

enum Color c = GREEN;
printf("%d", c);  // Output: 1 (or 6 in second example)
```

---

## 13. Structure Padding (SOLITON FAVORITE!)

### Rule: Members are aligned to their own size boundary.

```c
struct A {
    char c;     // 1 byte + 3 bytes padding
    int i;      // 4 bytes
};
sizeof(struct A) = 8   // NOT 5!

struct B {
    int i;      // 4 bytes
    char c;     // 1 byte + 3 bytes padding (total must be multiple of largest)
};
sizeof(struct B) = 8   // NOT 5!

struct C {
    char c1;    // 1 byte + 1 padding
    short s;    // 2 bytes
    int i;      // 4 bytes
};
sizeof(struct C) = 8

struct D {
    char c1;    // 1 byte
    char c2;    // 1 byte + 2 padding
    int i;      // 4 bytes
};
sizeof(struct D) = 8

// Order matters!
struct E {
    char c;     // 1 + 7 padding
    double d;   // 8 bytes
    char c2;    // 1 + 7 padding
};
sizeof(struct E) = 24

struct F {
    double d;   // 8 bytes
    char c;     // 1 byte
    char c2;    // 1 byte + 6 padding
};
sizeof(struct F) = 16   // Same members, LESS padding!
```

### Padding Rules:

1. Each member starts at address divisible by its own size
2. Total struct size = multiple of largest member's size
3. **Order of members affects total size!**

---

## 14. Storage Classes

| Storage Class | Scope | Lifetime | Default Value | Where Stored |
|---------------|-------|----------|---------------|-------------|
| `auto` | Local (block) | Until block ends | Garbage | Stack |
| `static` | Local (block) | Entire program | 0 | Data segment |
| `extern` | Global (all files) | Entire program | 0 | Data segment |
| `register` | Local (block) | Until block ends | Garbage | CPU Register |

### static — Most Important!

```c
void func() {
    static int count = 0;   // Initialized ONLY ONCE!
    count++;
    printf("%d ", count);
}

func(); func(); func();
// Output: 1 2 3 (NOT 1 1 1!)
// static retains value between function calls

// static function: visible only in current file
static void helper() { }  // Can't be called from other .c files
```

### extern:

```c
// file1.c
int global_var = 10;

// file2.c
extern int global_var;     // Declaration: "this exists in another file"
printf("%d", global_var);  // Output: 10
```

---

## 15. Macros & Preprocessor

### #define Macros:

```c
#define PI 3.14159
#define MAX(a, b) ((a) > (b) ? (a) : (b))
```

### Macro Traps (INTERVIEW FAVORITE!):

```c
// Trap 1: No parentheses
#define SQUARE(x) x*x
SQUARE(3+1) = 3+1*3+1 = 7    // NOT 16!
// Fix: #define SQUARE(x) ((x)*(x))

// Trap 2: Side effects
#define SQUARE(x) ((x)*(x))
int a = 5;
SQUARE(a++) = (a++)*(a++)     // a incremented TWICE! Undefined!

// Trap 3: Semicolons
#define BAD 10;
int x = BAD + 5;  // Expands to: int x = 10; + 5; → ERROR!
```

### Preprocessor Directives:

```c
#include <stdio.h>    // System headers
#include "myfile.h"   // Local headers

#ifdef DEBUG
    printf("Debug mode\n");
#endif

#ifndef HEADER_H       // Include guard
#define HEADER_H
// ... header content ...
#endif

#define STR(x) #x        // Stringification: STR(hello) → "hello"
#define CONCAT(a,b) a##b  // Concatenation: CONCAT(x,1) → x1
```

### Macro vs Function:

| Feature | Macro | Function |
|---------|-------|----------|
| Speed | Faster (no call overhead) | Slower (call overhead) |
| Type checking | ❌ No | ✅ Yes |
| Code size | Increases (copy-paste) | Shared |
| Side effects | Dangerous (args evaluated multiple times) | Safe |

---

## 16. const & volatile

### const:

```c
const int x = 10;
x = 20;               // ❌ ERROR! Can't modify

// POINTER COMBINATIONS — Read right to left!
const int *p;          // pointer to const int — can't change *p
int *const p;          // const pointer to int — can't change p
const int *const p;    // const pointer to const int — can't change either

// Memory trick:
// "const" LEFT of * → value is const (*p = 5 ❌)
// "const" RIGHT of * → pointer is const (p = &b ❌)
```

### volatile:

```c
volatile int flag;
// Tells compiler: "Don't optimize this! Value can change anytime!"
// Used in:
// 1. Hardware registers (embedded programming — SOLITON!)
// 2. Variables modified by ISR (Interrupt Service Routine)
// 3. Variables shared between threads

// Without volatile: compiler may cache value in register
// With volatile: compiler ALWAYS reads from memory
```

---

## 17. Dynamic Memory

```c
// malloc: allocates, does NOT initialize (garbage values)
int *p = (int *)malloc(5 * sizeof(int));

// calloc: allocates AND initializes to 0
int *p = (int *)calloc(5, sizeof(int));

// realloc: resize previously allocated memory
p = (int *)realloc(p, 10 * sizeof(int));

// free: release memory
free(p);
p = NULL;   // ALWAYS set to NULL after free!
```

### Common Bugs:

```c
// Memory Leak: forgot to free
void func() {
    int *p = (int *)malloc(100);
    return;    // p lost! Memory leaked!
}

// Dangling Pointer: using after free
int *p = (int *)malloc(sizeof(int));
*p = 10;
free(p);
printf("%d", *p);    // ❌ DANGLING! Undefined behavior

// Double Free:
free(p);
free(p);             // ❌ Undefined behavior!

// NULL check:
int *p = (int *)malloc(sizeof(int));
if (p == NULL) {
    printf("Allocation failed!\n");
    return;
}
```

---

## 18. Recursion

### How to trace:

```c
void fun(int n) {
    if (n == 0) return;
    printf("%d ", n);
    fun(n - 1);
    printf("%d ", n);
}
fun(3);
// Output: 3 2 1 1 2 3
// Trace:
// fun(3): print 3, call fun(2)
//   fun(2): print 2, call fun(1)
//     fun(1): print 1, call fun(0)
//       fun(0): return
//     back to fun(1): print 1
//   back to fun(2): print 2
// back to fun(3): print 3
```

### static + Recursion:

```c
int fun(int n) {
    static int count = 0;
    count++;
    if (n > 0) fun(n - 1);
    return count;
}
printf("%d", fun(3));
// count increments 4 times (fun(3), fun(2), fun(1), fun(0))
// Output: 4
```

---

## 19. I/O Buffering

### Three Buffer Types:

| Type | Flushes when... | Used by |
|------|----------------|---------|
| Line-buffered | `\n` encountered or buffer full | `stdout` |
| Fully-buffered | Buffer full only | Files |
| Unbuffered | Immediately (no buffer) | `stderr` |

### Key Example:

```c
printf("Hello");     // May NOT print immediately (no \n)!
printf("Hello\n");   // Prints immediately (\n flushes)
fprintf(stderr, "Error");  // Prints immediately (unbuffered)
fflush(stdout);      // Force flush manually
```

---

## 20. Endianness (SOLITON FAVORITE — Embedded!)

```c
int x = 0x01020304;   // 4 bytes: 01, 02, 03, 04

// Little Endian (Intel x86): LSB stored at lowest address
// Memory: [04] [03] [02] [01]
// "Little end first"

// Big Endian (Network/Motorola): MSB stored at lowest address
// Memory: [01] [02] [03] [04]
// "Big end first"

// How to detect endianness:
int x = 1;
char *c = (char *)&x;
if (*c == 1)
    printf("Little Endian");   // Intel machines
else
    printf("Big Endian");
```

---

## 21. Undefined Behavior

### Golden Rule: Between two sequence points, a variable must NOT be modified more than once!

```c
// ALL UNDEFINED:
int a = 5;
a++ + a++;        // ❌ a modified twice, + has no sequence point
++a + ++a;        // ❌ same
a = a++;          // ❌ a modified by ++ AND by =
i = i++ + ++i;    // ❌
printf("%d %d", a++, a++);  // ❌ no sequence point between args

// CORRECT Interview Answer: "This is Undefined Behavior. Output is compiler-dependent."
```

### Sequence Points exist at:

`;` `&&` `||` `?:` `,` (comma operator) and before function execution

---

## 22. Interview Questions (50+)

### Q1. What is the output?
```c
int a = 10;
int b = a++ + ++a;
```
**Answer:** Undefined Behavior. Output is compiler-dependent.

### Q2. What is the output?
```c
printf("%d", sizeof(void));
```
**Answer:** 1 on GCC (extension). Not valid per C standard.

### Q3. What is sizeof(void *) on 64-bit?
**Answer:** 8 bytes.

### Q4. What is the output?
```c
int x = 12, y = 0x12, z = 012;
printf("%d %d %d", x, y, z);
```
**Answer:** 12 18 10

### Q5. What is the output?
```c
int a = 8, b = 4;
if (a & b) printf("True");
else printf("False");
```
**Answer:** False. `8 & 4 = 1000 & 0100 = 0000 = 0`.

### Q6. What if we change `&` to `&&`?
**Answer:** True. `8 && 4` = both non-zero = logical TRUE.

### Q7. What is the output?
```c
int x = 1, y = 1;
if (x++ >= 0 || ++y > 0) printf("%d %d", x, y);
```
**Answer:** `2 1`. Left side TRUE → short-circuit → `++y` never executes.

### Q8. What is the output?
```c
char *c;
printf("%lu %lu", sizeof(c), sizeof(*c));
```
**Answer:** `8 1` (on 64-bit). `c` = pointer (8 bytes), `*c` = char (1 byte).

### Q9. What is the output?
```c
int a = 100;
printf("%d %d", *&a, **&(&a));  // second one is invalid
```
**Answer:** `*&a` = 100. `**&(&a)` won't compile — `&a` is an rvalue, can't take its address.

### Q10. What is the output?
```c
int a[4] = {1,2,3,4};
int (*p)[4] = &a;
printf("%ld", (long)(p+1) - (long)p);
```
**Answer:** 16 (4 ints × 4 bytes).

### Q11. What is the output?
```c
int i = 13 / 5 * 4;
```
**Answer:** 8. `(13/5)*4 = 2*4 = 8`.

### Q12. What about `int j = 13.0 / 5 * 4;`?
**Answer:** 10. `(13.0/5)*4 = 2.6*4 = 10.4` → truncated to 10.

### Q13. What is the output?
```c
int x = (1, 2, 3);
printf("%d", x);
```
**Answer:** 3 (comma operator returns last value).

### Q14. Will this compile?
```c
void v;
```
**Answer:** No! Cannot declare variable of type void.

### Q15. What is the output?
```c
char c = 200;
printf("%d", c);
```
**Answer:** -56 (signed char overflow: 200 - 256 = -56).

### Q16. What is the output?
```c
unsigned char c = 200;
printf("%d", c);
```
**Answer:** 200 (fits in unsigned char range 0-255).

### Q17. What is the output?
```c
float f = 0.1 + 0.2;
if (f == 0.3) printf("Equal");
else printf("Not Equal");
```
**Answer:** "Not Equal"! Floating-point precision issue.

### Q18. What about `float f = 0.5; if (f == 0.5)`?
**Answer:** "Equal"! 0.5 = 1/2 = exact in binary.

### Q19. What is the output?
```c
#define SQUARE(x) x*x
printf("%d", SQUARE(3+1));
```
**Answer:** 7. Expands to `3+1*3+1 = 3+3+1 = 7`.

### Q20. How to fix Q19?
**Answer:** `#define SQUARE(x) ((x)*(x))` → gives 16.

### Q21. What is sizeof this struct?
```c
struct S { char c; int i; };
```
**Answer:** 8 (1 byte char + 3 padding + 4 byte int).

### Q22. What is sizeof this union?
```c
union U { int i; double d; char c; };
```
**Answer:** 8 (size of largest member = double).

### Q23. What is the output?
```c
void func() {
    static int x = 0;
    x++;
    printf("%d ", x);
}
func(); func(); func();
```
**Answer:** `1 2 3`. Static retains value between calls.

### Q24. What is the output?
```c
int a = 5;
int b = sizeof(a++);
printf("%d %d", a, b);
```
**Answer:** `5 4`. sizeof does NOT evaluate `a++`!

### Q25. What is `~5`?
**Answer:** -6. Formula: `~n = -(n+1)`.

### Q26. What is `5 << 2`?
**Answer:** 20. Left shift = multiply by 2² = 5 × 4.

### Q27. What is `20 >> 2`?
**Answer:** 5. Right shift = divide by 2² = 20 ÷ 4.

### Q28. How to check if a number is odd using bitwise?
**Answer:** `if (n & 1)` — checks last bit.

### Q29. What is the output?
```c
int arr[5] = {1, 2};
printf("%d %d", arr[2], arr[4]);
```
**Answer:** `0 0`. Uninitialized array elements default to 0.

### Q30. What is the output?
```c
char s[] = "hello";
printf("%lu %lu", sizeof(s), strlen(s));
```
**Answer:** `6 5`. sizeof counts `\0`, strlen doesn't.

### Q31. What's the difference between `const int *p` and `int *const p`?
**Answer:** `const int *p` = can't change value (`*p`). `int *const p` = can't change pointer (`p` itself).

### Q32. What is volatile used for?
**Answer:** Tells compiler not to optimize the variable. Used for hardware registers, ISR variables, multi-threaded shared variables.

### Q33. What is a dangling pointer?
**Answer:** A pointer that points to memory that has been freed/deallocated.

### Q34. What is a memory leak?
**Answer:** Allocated memory that is never freed, becoming permanently unavailable.

### Q35. Difference between malloc and calloc?
**Answer:** malloc doesn't initialize (garbage). calloc initializes to 0. calloc takes two args (count, size).

### Q36. What is the output?
```c
enum Day { MON, TUE, WED = 5, THU, FRI };
printf("%d %d %d", MON, WED, FRI);
```
**Answer:** `0 5 7`. After WED=5, THU=6, FRI=7.

### Q37. Little Endian or Big Endian — how to check in code?
```c
int x = 1;
if (*(char *)&x == 1) printf("Little Endian");
else printf("Big Endian");
```

### Q38. What is the output?
```c
printf("Hello");
sleep(5);
printf("World\n");
```
**Answer:** Nothing for 5 seconds, then "HelloWorld" appears together. First printf stays in buffer until `\n` flushes it.

### Q39. What is `*p` where `p` is `void *`?
**Answer:** Compilation error. Must cast first: `*(int *)p`.

### Q40. What is the output?
```c
int a = 2, b = 4;
if (a > 3, b > 3) printf("True");
else printf("False");
```
**Answer:** True. Comma operator — only `b > 3` (last expression) decides.

### Q41. What is the output?
```c
char *p = (char *)100;
int *q = (int *)100;
printf("%d %d", p + 1, q + 1);
```
**Answer:** `101 104`. char steps by 1, int steps by 4.

### Q42. What is the output?
```c
int a[5] = {1,2,3,4,5};
int *p = a;
printf("%d", *(p + 3));
```
**Answer:** 4 (same as `a[3]`).

### Q43. What is `sizeof(arr)` vs `sizeof(p)` where `int arr[5]; int *p = arr;`?
**Answer:** `sizeof(arr) = 20`, `sizeof(p) = 8`. Array vs pointer!

### Q44. What is the output?
```c
unsigned int a = 1;
int b = -1;
if (a > b) printf("a"); else printf("b");
```
**Answer:** "b"! `-1` becomes `4294967295` when converted to unsigned.

### Q45. What is `2 + 3 * 4`?
**Answer:** 14 (not 20). `*` has higher precedence.

### Q46. Can we have function inside a structure in C?
**Answer:** No! (That's C++). In C, we can have function POINTERS inside structs.

### Q47. What is the output?
```c
int a = 0;
if (a++) printf("True");
else printf("False");
printf(" %d", a);
```
**Answer:** `False 1`. Post-increment: a used as 0 (FALSE) first, then becomes 1.

### Q48. What is `'\0'` vs `0` vs `NULL`?
**Answer:** `'\0'` = null character (char, value 0). `0` = integer zero. `NULL` = null pointer ((void *)0).

### Q49. What does `#pragma pack(1)` do?
**Answer:** Removes structure padding. `struct { char c; int i; }` becomes 5 bytes instead of 8.

### Q50. What is the output?
```c
int x = 5;
printf("%d %d %d", x, x++, ++x);
```
**Answer:** Undefined Behavior! No sequence point between function arguments.

---

> **🎯 FINAL TIP: If ANY interview question has the same variable modified twice in one expression with `+`, `-`, `*`, `/`, or `=` between them — the answer is ALWAYS "Undefined Behavior, compiler-dependent."**

---

*Good luck at Soliton! You've got this! 💪🔥*
