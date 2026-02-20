# 🎯 SOLITON C PROGRAMMING ROUND — COMPLETE CRACKING GUIDE

> **This covers ONLY the coding round. Every question ever reported by candidates. Master these = 100% clear.**

---

## 📋 ROUND FORMAT (Know This First!)

| Detail | Info |
|--------|------|
| **Questions** | 3 coding problems |
| **Time** | ~20 min per question OR 3 hours total |
| **Language** | **C ONLY** (no C++, no Python) |
| **Key Rule** | They may ask you to **explain logic BEFORE coding** |
| **Critical Skill** | **Input parsing** — arrays often given as string format like `"[1,2,3,4]"` |
| **Difficulty** | Easy to Medium (no DP/graph heavy — focus on arrays, strings, matrix) |

---

## ⚡ PRIORITY RANKING — What Gets Asked Most

| Rank | Category | Frequency | Questions |
|------|----------|-----------|-----------|
| 🥇 | **Array Problems** | ★★★★★ | 8+ variations reported |
| 🥈 | **String Manipulation** | ★★★★☆ | 5+ variations |
| 🥉 | **Matrix Operations** | ★★★★☆ | 2-3 variations |
| 4 | **Number Problems** | ★★★☆☆ | 4-5 variations |
| 5 | **Pattern Printing** | ★★★☆☆ | Star + Number patterns |
| 6 | **Input Parsing** | ★★★☆☆ | String-to-array conversion |

---

## 🔴 CATEGORY 1: ARRAY PROBLEMS (MOST ASKED!)

---

### Q1. Maximum Subarray Sum (Kadane's Algorithm) ⭐⭐⭐
**Reported:** Multiple times across 2023-2025

```c
#include <stdio.h>

int maxSubarraySum(int arr[], int n) {
    int maxSoFar = arr[0];
    int maxEndingHere = arr[0];
    
    for (int i = 1; i < n; i++) {
        // Either extend the previous subarray, or start fresh from current element
        if (maxEndingHere + arr[i] > arr[i])
            maxEndingHere = maxEndingHere + arr[i];
        else
            maxEndingHere = arr[i];
        
        // Update global maximum
        if (maxEndingHere > maxSoFar)
            maxSoFar = maxEndingHere;
    }
    return maxSoFar;
}

int main() {
    int arr[] = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
    int n = sizeof(arr) / sizeof(arr[0]);
    printf("Maximum subarray sum: %d\n", maxSubarraySum(arr, n));
    // Output: 6 (subarray [4, -1, 2, 1])
    return 0;
}
```

**Logic to explain:**
- Walk through the array. At each element, decide: "Should I add this to my running sum, or start a new subarray here?"
- If running sum + current > current alone → extend. Otherwise → restart.
- Track the global best throughout.

---

### Q2. Second Smallest Element in Array ⭐⭐⭐
**Reported:** FacePrep, Scribd interview experiences

```c
#include <stdio.h>
#include <limits.h>

int secondSmallest(int arr[], int n) {
    if (n < 2) return -1;
    
    int first = INT_MAX, second = INT_MAX;
    
    for (int i = 0; i < n; i++) {
        if (arr[i] < first) {
            second = first;      // old first becomes second
            first = arr[i];      // new first
        } else if (arr[i] < second && arr[i] != first) {
            second = arr[i];     // new second (must be different from first)
        }
    }
    
    if (second == INT_MAX) return -1;  // no second smallest exists
    return second;
}

int main() {
    int arr[] = {5, 2, 8, 1, 9, 3};
    int n = sizeof(arr) / sizeof(arr[0]);
    printf("Second smallest: %d\n", secondSmallest(arr, n));
    // Output: 2
    return 0;
}
```

**Why this approach?** Single pass O(n). Don't sort — that's O(n log n) and they'll ask why you didn't do it in one pass.

---

### Q3. Sort an Array (Multiple Sorting Algorithms) ⭐⭐⭐
**Reported:** FacePrep, GFG

Know **Bubble Sort** (easiest to write) and **Selection Sort** (asked to explain):

```c
// Bubble Sort — simplest to code in interview
void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int swapped = 0;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = 1;
            }
        }
        if (!swapped) break;  // optimization: already sorted
    }
}

// Selection Sort — they ask to explain logic
void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx])
                minIdx = j;
        }
        // Swap minimum with position i
        int temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
    }
}
```

---

### Q4. Longest Subarray with Sum Zero ⭐⭐⭐
**Reported:** GFG Interview Experience (exact question)

```c
#include <stdio.h>

// Simple O(n²) approach — safe for interview
void longestZeroSumSubarray(int arr[], int n) {
    int maxLen = 0, startIdx = -1;
    
    for (int i = 0; i < n; i++) {
        int sum = 0;
        for (int j = i; j < n; j++) {
            sum += arr[j];
            if (sum == 0 && (j - i + 1) > maxLen) {
                maxLen = j - i + 1;
                startIdx = i;
            }
        }
    }
    
    if (maxLen == 0) {
        printf("No subarray with sum 0\n");
    } else {
        printf("Longest zero-sum subarray (length %d): ", maxLen);
        for (int i = startIdx; i < startIdx + maxLen; i++)
            printf("%d ", arr[i]);
        printf("\n");
    }
}

int main() {
    int arr[] = {1, 2, -3, 3, 1, -1, -2};
    int n = sizeof(arr) / sizeof(arr[0]);
    longestZeroSumSubarray(arr, n);
    // Output: Longest zero-sum subarray (length 5): 2 -3 3 1 -1
    return 0;
}
```

**If they want "first one" when multiple exist:** The above already returns the first one found (leftmost start index).

---

### Q5. Min Absolute Difference + Max Index Difference ⭐⭐
**Reported:** GFG Interview Experience (exact wording)

> "Given an array, find the pair where absolute difference is minimum AND the difference between indices is maximum."

```c
#include <stdio.h>
#include <stdlib.h>

void findPair(int arr[], int n) {
    int minDiff = abs(arr[0] - arr[1]);
    int bestI = 0, bestJ = 1;
    int maxIdxDiff = 1;
    
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            int diff = abs(arr[i] - arr[j]);
            int idxDiff = j - i;
            
            if (diff < minDiff || (diff == minDiff && idxDiff > maxIdxDiff)) {
                minDiff = diff;
                maxIdxDiff = idxDiff;
                bestI = i;
                bestJ = j;
            }
        }
    }
    
    printf("Elements: arr[%d]=%d and arr[%d]=%d\n", bestI, arr[bestI], bestJ, arr[bestJ]);
    printf("Abs diff: %d, Index diff: %d\n", minDiff, maxIdxDiff);
}

int main() {
    int arr[] = {4, 2, 1, 3, 2, 5};
    int n = sizeof(arr) / sizeof(arr[0]);
    findPair(arr, n);
    return 0;
}
```

---

### Q6. Sum of Perfect Squares in Array ⭐⭐
**Reported:** Scribd interview experience

```c
#include <stdio.h>
#include <math.h>

int isPerfectSquare(int n) {
    if (n < 0) return 0;
    int root = (int)sqrt(n);
    return root * root == n;
}

int sumOfPerfectSquares(int arr[], int n) {
    int sum = 0;
    for (int i = 0; i < n; i++) {
        if (isPerfectSquare(arr[i])) {
            sum += arr[i];
        }
    }
    return sum;
}

int main() {
    int arr[] = {2, 4, 7, 9, 16, 3, 25};
    int n = sizeof(arr) / sizeof(arr[0]);
    printf("Sum of perfect squares: %d\n", sumOfPerfectSquares(arr, n));
    // Output: 54 (4 + 9 + 16 + 25)
    return 0;
}
```

**Trap:** `sqrt()` returns double. Always cast to int and verify `root*root == n` to avoid floating-point errors.

---

### Q7. Subset Sum — Maximum Elements That Sum to Target ⭐⭐
**Reported:** Medium interview experience

> "Given an array and a target sum, find the maximum number of elements that can be selected to sum up to target."

```c
#include <stdio.h>

// Sort ascending first, then greedily pick smallest elements
int compare(const void *a, const void *b) {
    return (*(int *)a - *(int *)b);
}

int maxElementsForSum(int arr[], int n, int target) {
    qsort(arr, n, sizeof(int), compare);
    
    int count = 0, sum = 0;
    for (int i = 0; i < n; i++) {
        if (sum + arr[i] <= target) {
            sum += arr[i];
            count++;
        }
        if (sum == target) break;
    }
    
    return (sum == target) ? count : -1;  // -1 if exact sum not possible
}

int main() {
    int arr[] = {3, 1, 4, 2, 5};
    int n = sizeof(arr) / sizeof(arr[0]);
    int target = 6;
    printf("Max elements: %d\n", maxElementsForSum(arr, n, target));
    // Output: 3 (1 + 2 + 3 = 6)
    return 0;
}
```

---

### Q8. Plus One (LeetCode 66) ⭐⭐
**Reported:** YouTube interview experience

> "Given a number represented as an array of digits, add one to the number."

```c
#include <stdio.h>

void plusOne(int digits[], int n) {
    int carry = 1;
    
    for (int i = n - 1; i >= 0; i--) {
        int sum = digits[i] + carry;
        digits[i] = sum % 10;
        carry = sum / 10;
        if (carry == 0) break;  // no more carry, done
    }
    
    if (carry) {
        // Need extra digit (e.g., 999 → 1000)
        printf("1");
    }
    for (int i = 0; i < n; i++)
        printf("%d", digits[i]);
    printf("\n");
}

int main() {
    int digits[] = {1, 2, 9};
    plusOne(digits, 3);      // Output: 130
    
    int digits2[] = {9, 9, 9};
    plusOne(digits2, 3);     // Output: 1000
    return 0;
}
```

---

## 🟡 CATEGORY 2: STRING PROBLEMS

---

### Q9. Reverse a String ⭐⭐⭐
**Reported:** Multiple experiences

```c
#include <stdio.h>
#include <string.h>

void reverseString(char str[]) {
    int left = 0, right = strlen(str) - 1;
    
    while (left < right) {
        char temp = str[left];
        str[left] = str[right];
        str[right] = temp;
        left++;
        right--;
    }
}

int main() {
    char str[] = "Soliton";
    reverseString(str);
    printf("%s\n", str);  // Output: notiloS
    return 0;
}
```

---

### Q10. Print Unique Strings (Ignore Case + Special Chars) ⭐⭐⭐
**Reported:** GFG Interview Experience (EXACT question)

> "Given array of strings like 'Ram N', 'ramN', 'RamN', 'ramn' — print only unique ones ignoring case and special characters."

```c
#include <stdio.h>
#include <string.h>
#include <ctype.h>

// Extract only alphabets in lowercase
void normalize(const char *src, char *dest) {
    int j = 0;
    for (int i = 0; src[i]; i++) {
        if (isalpha(src[i])) {
            dest[j++] = tolower(src[i]);
        }
    }
    dest[j] = '\0';
}

int main() {
    char *strings[] = {"Ram N", "ramN", "RamN", "ramn", "Hello", "hello!", "World"};
    int n = 7;
    int printed[100] = {0};  // track which indices are already printed
    
    for (int i = 0; i < n; i++) {
        if (printed[i]) continue;
        
        char norm1[100];
        normalize(strings[i], norm1);
        
        // Mark all duplicates
        for (int j = i + 1; j < n; j++) {
            char norm2[100];
            normalize(strings[j], norm2);
            if (strcmp(norm1, norm2) == 0) {
                printed[j] = 1;
            }
        }
        
        printf("%s\n", strings[i]);  // print first occurrence
    }
    return 0;
}
// Output:
// Ram N
// Hello
// World
```

---

### Q11. Check Password Strength ⭐⭐
**Reported:** GFG Interview Experience

> Rules: Must have uppercase, lowercase, digit, special char, length ≥ 8.

```c
#include <stdio.h>
#include <string.h>
#include <ctype.h>

void checkPassword(const char *pwd) {
    int hasUpper = 0, hasLower = 0, hasDigit = 0, hasSpecial = 0;
    int len = strlen(pwd);
    
    if (len < 8) {
        printf("Weak: Too short (min 8 chars)\n");
        return;
    }
    
    for (int i = 0; pwd[i]; i++) {
        if (isupper(pwd[i])) hasUpper = 1;
        else if (islower(pwd[i])) hasLower = 1;
        else if (isdigit(pwd[i])) hasDigit = 1;
        else hasSpecial = 1;
    }
    
    int score = hasUpper + hasLower + hasDigit + hasSpecial;
    
    if (score == 4) printf("Strong\n");
    else if (score == 3) printf("Medium\n");
    else printf("Weak\n");
    
    if (!hasUpper)   printf("  Missing: uppercase letter\n");
    if (!hasLower)   printf("  Missing: lowercase letter\n");
    if (!hasDigit)   printf("  Missing: digit\n");
    if (!hasSpecial) printf("  Missing: special character\n");
}

int main() {
    checkPassword("Soliton@2024");  // Strong
    checkPassword("soliton");       // Weak
    return 0;
}
```

---

### Q12. FLAMES Game ⭐⭐
**Reported:** Scribd interview experience

```c
#include <stdio.h>
#include <string.h>
#include <ctype.h>

void flames(const char *name1, const char *name2) {
    int freq[26] = {0};
    char flames[] = "FLAMES";
    int flen = 6;
    
    // Count chars in name1 (ignore spaces)
    for (int i = 0; name1[i]; i++)
        if (isalpha(name1[i])) freq[tolower(name1[i]) - 'a']++;
    
    // Remove matching chars from name2
    for (int i = 0; name2[i]; i++)
        if (isalpha(name2[i])) {
            int idx = tolower(name2[i]) - 'a';
            if (freq[idx] > 0) freq[idx]--;
            else freq[idx]--;
        }
    
    // Count remaining (non-cancelled) characters
    int count = 0;
    for (int i = 0; i < 26; i++)
        if (freq[i] != 0) count += (freq[i] > 0 ? freq[i] : -freq[i]);
    
    // Eliminate letters from FLAMES
    int removed[6] = {0};
    int remaining = flen;
    int idx = 0;
    
    while (remaining > 1) {
        int steps = count;
        while (steps > 0) {
            if (!removed[idx]) steps--;
            if (steps > 0) idx = (idx + 1) % flen;
        }
        removed[idx] = 1;
        remaining--;
        // Move to next non-removed
        do { idx = (idx + 1) % flen; } while (removed[idx]);
    }
    
    // Find the surviving letter
    for (int i = 0; i < flen; i++) {
        if (!removed[i]) {
            char *meanings[] = {"Friends", "Love", "Affection", "Marriage", "Enemy", "Sister"};
            printf("Result: %c = %s\n", flames[i], meanings[i]);
            break;
        }
    }
}

int main() {
    flames("SOLITON", "CODING");
    return 0;
}
```

---

### Q13. Minimum Repeating Characters in String ⭐⭐
**Reported:** Scribd interview experience

```c
#include <stdio.h>
#include <string.h>
#include <limits.h>

int minRepeating(const char *str) {
    int freq[256] = {0};
    
    for (int i = 0; str[i]; i++)
        freq[(unsigned char)str[i]]++;
    
    int minCount = INT_MAX;
    char minChar = '\0';
    
    // Find minimum frequency among characters that repeat (freq > 1)
    for (int i = 0; i < 256; i++) {
        if (freq[i] > 1 && freq[i] < minCount) {
            minCount = freq[i];
            minChar = (char)i;
        }
    }
    
    if (minChar == '\0') {
        printf("No repeating characters\n");
        return 0;
    }
    
    printf("Min repeating: '%c' appears %d times\n", minChar, minCount);
    return minCount;
}

int main() {
    minRepeating("programming");  // Output depends on repeats
    return 0;
}
```

---

### Q14. Valid Parentheses (LeetCode 20) ⭐⭐
**Reported:** YouTube interview experience

```c
#include <stdio.h>
#include <string.h>

int isValid(const char *s) {
    char stack[10000];
    int top = -1;
    
    for (int i = 0; s[i]; i++) {
        char c = s[i];
        
        // Push opening brackets
        if (c == '(' || c == '{' || c == '[') {
            stack[++top] = c;
        } else {
            // Closing bracket — check if stack has matching opening
            if (top == -1) return 0;  // nothing to match
            
            char open = stack[top--];
            if ((c == ')' && open != '(') ||
                (c == '}' && open != '{') ||
                (c == ']' && open != '['))
                return 0;
        }
    }
    
    return top == -1;  // stack must be empty
}

int main() {
    printf("%s\n", isValid("(){}[]") ? "Valid" : "Invalid");     // Valid
    printf("%s\n", isValid("({[]})") ? "Valid" : "Invalid");     // Valid
    printf("%s\n", isValid("({[}])") ? "Valid" : "Invalid");     // Invalid
    return 0;
}
```

---

## 🟢 CATEGORY 3: MATRIX OPERATIONS

---

### Q15. Rotate N×N Matrix 90° Clockwise (IN-PLACE!) ⭐⭐⭐
**Reported:** GFG Interview Experience (exact: "without using linked lists or auxiliary arrays")

**This is a SOLITON FAVORITE — asked multiple times!**

```c
#include <stdio.h>

// Step 1: Transpose the matrix (swap rows and columns)
// Step 2: Reverse each row

void rotateMatrix(int n, int mat[n][n]) {
    // Step 1: Transpose
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            int temp = mat[i][j];
            mat[i][j] = mat[j][i];
            mat[j][i] = temp;
        }
    }
    
    // Step 2: Reverse each row
    for (int i = 0; i < n; i++) {
        int left = 0, right = n - 1;
        while (left < right) {
            int temp = mat[i][left];
            mat[i][left] = mat[i][right];
            mat[i][right] = temp;
            left++;
            right--;
        }
    }
}

void printMatrix(int n, int mat[n][n]) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++)
            printf("%3d", mat[i][j]);
        printf("\n");
    }
}

int main() {
    int mat[3][3] = {{1,2,3}, {4,5,6}, {7,8,9}};
    
    printf("Original:\n");
    printMatrix(3, mat);
    
    rotateMatrix(3, mat);
    
    printf("\nRotated 90° clockwise:\n");
    printMatrix(3, mat);
    // Output:
    //  7  4  1
    //  8  5  2
    //  9  6  3
    return 0;
}
```

**Explain this logic:**
```
Original:       Transpose:      Reverse rows:
1 2 3           1 4 7           7 4 1
4 5 6    →      2 5 8    →      8 5 2
7 8 9           3 6 9           9 6 3
```

---

### Q16. Matrix Transpose + Multiply with Original ⭐⭐
**Reported:** GFG Interview Experience (exact question)

```c
#include <stdio.h>

void transpose(int n, int mat[n][n], int trans[n][n]) {
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            trans[i][j] = mat[j][i];
}

void multiply(int n, int A[n][n], int B[n][n], int result[n][n]) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            result[i][j] = 0;
            for (int k = 0; k < n; k++) {
                result[i][j] += A[i][k] * B[k][j];
            }
        }
    }
}

int main() {
    int n = 2;
    int mat[2][2] = {{1, 2}, {3, 4}};
    int trans[2][2], result[2][2];
    
    transpose(n, mat, trans);
    multiply(n, mat, trans, result);
    
    printf("A × A^T:\n");
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++)
            printf("%3d", result[i][j]);
        printf("\n");
    }
    // A = [1,2; 3,4], A^T = [1,3; 2,4]
    // Result: [5, 11; 11, 25]
    return 0;
}
```

---

## 🔵 CATEGORY 4: NUMBER PROBLEMS

---

### Q17. Prime Number Check ⭐⭐⭐
**Reported:** FacePrep, multiple experiences

```c
#include <stdio.h>

int isPrime(int n) {
    if (n <= 1) return 0;
    if (n <= 3) return 1;
    if (n % 2 == 0 || n % 3 == 0) return 0;
    
    // Check from 5 to √n, skipping even numbers
    for (int i = 5; i * i <= n; i += 6) {
        if (n % i == 0 || n % (i + 2) == 0)
            return 0;
    }
    return 1;
}

int main() {
    for (int i = 1; i <= 20; i++)
        if (isPrime(i)) printf("%d ", i);
    // Output: 2 3 5 7 11 13 17 19
    return 0;
}
```

**Why `i * i <= n`?** If n has a factor > √n, then it must also have one < √n. So we only need to check up to √n.

---

### Q18. Palindrome Check ⭐⭐⭐
**Reported:** FacePrep

```c
// Number palindrome
int isPalindrome(int n) {
    if (n < 0) return 0;
    int original = n, reversed = 0;
    
    while (n > 0) {
        reversed = reversed * 10 + n % 10;
        n /= 10;
    }
    
    return original == reversed;
}

// String palindrome
int isStringPalindrome(const char *str) {
    int left = 0, right = strlen(str) - 1;
    while (left < right) {
        if (str[left] != str[right]) return 0;
        left++;
        right--;
    }
    return 1;
}
```

---

### Q19. Armstrong Number ⭐⭐
**Reported:** FacePrep

> 153 = 1³ + 5³ + 3³ = 1 + 125 + 27 = 153 ✅

```c
#include <stdio.h>
#include <math.h>

int isArmstrong(int n) {
    int original = n, sum = 0;
    int digits = 0;
    
    // Count digits
    int temp = n;
    while (temp > 0) { digits++; temp /= 10; }
    
    // Sum of each digit raised to power of total digits
    temp = n;
    while (temp > 0) {
        int d = temp % 10;
        sum += (int)pow(d, digits);
        temp /= 10;
    }
    
    return sum == original;
}

int main() {
    printf("%d\n", isArmstrong(153));   // 1 (true)
    printf("%d\n", isArmstrong(370));   // 1 (true)
    printf("%d\n", isArmstrong(123));   // 0 (false)
    return 0;
}
```

---

### Q20. Binary to Hexadecimal ⭐⭐
**Reported:** GFG Interview Experience

```c
#include <stdio.h>
#include <string.h>

void binaryToHex(const char *binary) {
    int len = strlen(binary);
    
    // Pad from left to make length multiple of 4
    int padding = (4 - len % 4) % 4;
    
    // Process 4 bits at a time from right
    printf("0x");
    int start = 0;
    
    // Handle first group (may be less than 4 bits)
    int firstGroupSize = len % 4;
    if (firstGroupSize == 0) firstGroupSize = 4;
    
    int val = 0;
    for (int i = 0; i < firstGroupSize; i++) {
        val = val * 2 + (binary[i] - '0');
    }
    printf("%X", val);
    
    // Handle remaining groups of 4
    for (int i = firstGroupSize; i < len; i += 4) {
        val = 0;
        for (int j = 0; j < 4; j++) {
            val = val * 2 + (binary[i + j] - '0');
        }
        printf("%X", val);
    }
    printf("\n");
}

int main() {
    binaryToHex("11011110");   // Output: 0xDE
    binaryToHex("10100");      // Output: 0x14
    return 0;
}
```

---

### Q21. Count Leading Zeroes (16-bit) ⭐⭐
**Reported:** Scribd interview experience

```c
#include <stdio.h>

int countLeadingZeros(int n) {
    if (n == 0) return 16;  // all zeros in 16-bit
    
    int count = 0;
    // Check from bit 15 (MSB of 16-bit) downward
    for (int i = 15; i >= 0; i--) {
        if (n & (1 << i))
            break;       // found first 1-bit
        count++;
    }
    return count;
}

int main() {
    printf("Leading zeros of 1: %d\n", countLeadingZeros(1));      // 15
    printf("Leading zeros of 256: %d\n", countLeadingZeros(256));  // 7
    printf("Leading zeros of 32768: %d\n", countLeadingZeros(32768)); // 0
    return 0;
}
```

---

## 🟣 CATEGORY 5: PATTERN PRINTING

---

### Q22. Star Patterns (Multiple Types) ⭐⭐⭐
**Reported:** FacePrep, multiple experiences

```c
// Pattern 1: Right triangle
// *
// **
// ***
// ****
void pattern1(int n) {
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= i; j++)
            printf("*");
        printf("\n");
    }
}

// Pattern 2: Inverted right triangle
// ****
// ***
// **
// *
void pattern2(int n) {
    for (int i = n; i >= 1; i--) {
        for (int j = 1; j <= i; j++)
            printf("*");
        printf("\n");
    }
}

// Pattern 3: Pyramid (MOST ASKED!)
//    *
//   ***
//  *****
// *******
void pattern3(int n) {
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n - i; j++)   // spaces
            printf(" ");
        for (int j = 1; j <= 2 * i - 1; j++) // stars
            printf("*");
        printf("\n");
    }
}

// Pattern 4: Diamond
void pattern4(int n) {
    // Upper half (pyramid)
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n - i; j++) printf(" ");
        for (int j = 1; j <= 2 * i - 1; j++) printf("*");
        printf("\n");
    }
    // Lower half (inverted pyramid)
    for (int i = n - 1; i >= 1; i--) {
        for (int j = 1; j <= n - i; j++) printf(" ");
        for (int j = 1; j <= 2 * i - 1; j++) printf("*");
        printf("\n");
    }
}
```

---

### Q23. Number Patterns ⭐⭐
**Reported:** FacePrep

```c
// Floyd's Triangle:
// 1
// 2 3
// 4 5 6
// 7 8 9 10
void floydsTriangle(int n) {
    int num = 1;
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= i; j++)
            printf("%d ", num++);
        printf("\n");
    }
}

// Pascal's Triangle:
// 1
// 1 1
// 1 2 1
// 1 3 3 1
void pascalsTriangle(int n) {
    for (int i = 0; i < n; i++) {
        int val = 1;
        for (int j = 0; j <= i; j++) {
            printf("%d ", val);
            val = val * (i - j) / (j + 1);
        }
        printf("\n");
    }
}
```

---

## 🔶 CATEGORY 6: INPUT PARSING (CRITICAL SKILL!)

---

### Q24. Parse Array from String Input ⭐⭐⭐⭐⭐
**Reported as THE BIGGEST TRAP — many candidates fail here!**

> Soliton gives input like: `"[1, 2, 3, 4, 5]"` as a string. YOU must parse it into an actual int array.

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

int* parseArray(const char *input, int *size) {
    int *arr = (int *)malloc(100 * sizeof(int));
    *size = 0;
    
    int i = 0;
    // Skip until first digit or minus sign
    while (input[i] && !isdigit(input[i]) && input[i] != '-') i++;
    
    while (input[i] && input[i] != ']') {
        // Read number (handles negative numbers too)
        int num = 0, sign = 1;
        if (input[i] == '-') { sign = -1; i++; }
        
        while (isdigit(input[i])) {
            num = num * 10 + (input[i] - '0');
            i++;
        }
        
        arr[(*size)++] = sign * num;
        
        // Skip non-digit chars (commas, spaces)
        while (input[i] && !isdigit(input[i]) && input[i] != '-' && input[i] != ']') i++;
    }
    
    return arr;
}

int main() {
    char input[200];
    printf("Enter array: ");
    fgets(input, 200, stdin);  // e.g., "[1, 2, -3, 4, 5]"
    
    int size;
    int *arr = parseArray(input, &size);
    
    printf("Parsed %d elements: ", size);
    for (int i = 0; i < size; i++)
        printf("%d ", arr[i]);
    printf("\n");
    
    free(arr);
    return 0;
}
```

**Also know: Reading space-separated integers:**

```c
// Method 1: Using scanf in a loop
int n;
scanf("%d", &n);
int arr[100];
for (int i = 0; i < n; i++)
    scanf("%d", &arr[i]);

// Method 2: Reading entire line then parsing with sscanf/strtok
char line[1000];
fgets(line, 1000, stdin);
char *token = strtok(line, " ,\n");
int arr[100], size = 0;
while (token != NULL) {
    arr[size++] = atoi(token);
    token = strtok(NULL, " ,\n");
}
```

---

## 🔴 CATEGORY 7: BONUS QUESTIONS (Also Reported)

---

### Q25. Shortest Unsorted Continuous Subarray (LeetCode 581) ⭐⭐
**Reported:** YouTube interview experience

```c
#include <stdio.h>

int findUnsortedSubarray(int arr[], int n) {
    int start = -1, end = -1;
    int maxSoFar = arr[0], minSoFar = arr[n - 1];
    
    // Find rightmost boundary: traverse left to right
    for (int i = 1; i < n; i++) {
        if (arr[i] < maxSoFar)
            end = i;
        else
            maxSoFar = arr[i];
    }
    
    // Find leftmost boundary: traverse right to left
    for (int i = n - 2; i >= 0; i--) {
        if (arr[i] > minSoFar)
            start = i;
        else
            minSoFar = arr[i];
    }
    
    if (start == -1) return 0;  // already sorted
    return end - start + 1;
}

int main() {
    int arr[] = {2, 6, 4, 8, 10, 9, 15};
    int n = sizeof(arr) / sizeof(arr[0]);
    printf("Length of unsorted subarray: %d\n", findUnsortedSubarray(arr, n));
    // Output: 5 (subarray [6, 4, 8, 10, 9])
    return 0;
}
```

---

### Q26. Factorial (Recursive + Iterative) ⭐⭐

```c
// Recursive
int factorialRec(int n) {
    if (n <= 1) return 1;
    return n * factorialRec(n - 1);
}

// Iterative (preferred — no stack overflow risk)
int factorialIter(int n) {
    int result = 1;
    for (int i = 2; i <= n; i++)
        result *= i;
    return result;
}
```

---

### Q27. Fibonacci Series ⭐⭐

```c
void fibonacci(int n) {
    int a = 0, b = 1;
    for (int i = 0; i < n; i++) {
        printf("%d ", a);
        int temp = a + b;
        a = b;
        b = temp;
    }
    // Output (n=8): 0 1 1 2 3 5 8 13
}
```

---

### Q28. Sort Words + Search + Save to File ⭐⭐
**Reported:** Freshersworld interview experience

```c
#include <stdio.h>
#include <string.h>

void sortWords(char words[][50], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (strcmp(words[j], words[j + 1]) > 0) {
                char temp[50];
                strcpy(temp, words[j]);
                strcpy(words[j], words[j + 1]);
                strcpy(words[j + 1], temp);
            }
        }
    }
}

int searchWord(char words[][50], int n, const char *target) {
    for (int i = 0; i < n; i++) {
        if (strcmp(words[i], target) == 0) return i;
    }
    return -1;
}

void saveToFile(char words[][50], int n, const char *filename) {
    FILE *fp = fopen(filename, "w");
    if (!fp) { printf("Error opening file!\n"); return; }
    for (int i = 0; i < n; i++)
        fprintf(fp, "%s\n", words[i]);
    fclose(fp);
    printf("Saved to %s\n", filename);
}

int main() {
    char words[5][50] = {"banana", "apple", "cherry", "date", "elderberry"};
    int n = 5;
    
    sortWords(words, n);
    
    printf("Sorted:\n");
    for (int i = 0; i < n; i++) printf("  %s\n", words[i]);
    
    int idx = searchWord(words, n, "cherry");
    printf("'cherry' found at index: %d\n", idx);
    
    saveToFile(words, n, "output.txt");
    return 0;
}
```

---

## 🧠 CATEGORY 8: PREDICTED MUST-DO — BIT MANIPULATION (Soliton = Embedded!)

> **WHY:** Soliton is an embedded/signal processing company. Bit manipulation is their BREAD AND BUTTER.

---

### Q29. Count Set Bits (Hamming Weight) ⭐⭐⭐
**Why predicted:** Fundamental embedded interview question. Soliton works with hardware registers.

```c
#include <stdio.h>

// Method 1: Simple loop
int countSetBits(int n) {
    int count = 0;
    while (n) {
        count += n & 1;  // check last bit
        n >>= 1;         // shift right
    }
    return count;
}

// Method 2: Brian Kernighan's trick (FASTER — removes lowest set bit each time)
int countSetBitsFast(int n) {
    int count = 0;
    while (n) {
        n = n & (n - 1);  // removes lowest set bit!
        count++;
    }
    return count;
}

int main() {
    printf("Set bits in 13 (1101): %d\n", countSetBits(13));       // 3
    printf("Set bits in 255 (11111111): %d\n", countSetBitsFast(255)); // 8
    return 0;
}
```

**Explain the trick:** `n & (n-1)` flips the lowest set bit to 0.
```
13 = 1101 → 13 & 12 = 1101 & 1100 = 1100 (12) → one set bit removed
12 = 1100 → 12 & 11 = 1100 & 1011 = 1000 (8)  → one more removed
 8 = 1000 →  8 & 7  = 1000 & 0111 = 0000 (0)  → done! count = 3
```

---

### Q30. Check if Number is Power of 2 ⭐⭐⭐

```c
int isPowerOf2(int n) {
    // Powers of 2 have exactly ONE set bit
    // n & (n-1) removes that one bit → should become 0
    return (n > 0) && ((n & (n - 1)) == 0);
}

// Examples:
// 8  = 1000 → 8 & 7  = 1000 & 0111 = 0 ✅ power of 2
// 6  = 0110 → 6 & 5  = 0110 & 0101 = 0100 ≠ 0 ❌ not power of 2
// 16 = 10000 → 16 & 15 = 10000 & 01111 = 0 ✅
```

---

### Q31. Swap Two Numbers WITHOUT Temp Variable ⭐⭐⭐
**Classic embedded interview question**

```c
#include <stdio.h>

int main() {
    int a = 5, b = 10;
    
    // Method 1: XOR swap (NO overflow risk!)
    a = a ^ b;   // a = 5^10
    b = a ^ b;   // b = 5^10^10 = 5  ← b gets original a
    a = a ^ b;   // a = 5^10^5 = 10  ← a gets original b
    printf("After XOR swap: a=%d, b=%d\n", a, b);  // a=10, b=5
    
    // Method 2: Arithmetic (overflow risk with large numbers!)
    a = 5; b = 10;
    a = a + b;   // a = 15
    b = a - b;   // b = 15-10 = 5
    a = a - b;   // a = 15-5 = 10
    printf("After arithmetic swap: a=%d, b=%d\n", a, b);
    
    return 0;
}
```

---

### Q32. Toggle a Specific Bit ⭐⭐
**Embedded favorite — setting/clearing/toggling bits in hardware registers**

```c
#include <stdio.h>

// Set bit at position pos
int setBit(int n, int pos) {
    return n | (1 << pos);
}

// Clear bit at position pos
int clearBit(int n, int pos) {
    return n & ~(1 << pos);
}

// Toggle bit at position pos
int toggleBit(int n, int pos) {
    return n ^ (1 << pos);
}

// Check if bit at position pos is set
int checkBit(int n, int pos) {
    return (n >> pos) & 1;
}

int main() {
    int n = 13;  // 1101
    printf("Original: %d (1101)\n", n);
    printf("Set bit 1:    %d (%s)\n", setBit(n, 1), "1111 = 15");
    printf("Clear bit 2:  %d (%s)\n", clearBit(n, 2), "1001 = 9");
    printf("Toggle bit 0: %d (%s)\n", toggleBit(n, 0), "1100 = 12");
    printf("Bit 3 is: %d\n", checkBit(n, 3));  // 1
    return 0;
}
```

---

### Q33. Swap Nibbles (Swap Upper & Lower 4 Bits of a Byte) ⭐⭐

```c
#include <stdio.h>

unsigned char swapNibbles(unsigned char x) {
    return ((x & 0x0F) << 4) | ((x & 0xF0) >> 4);
}

int main() {
    unsigned char x = 0x2A;  // 0010 1010
    printf("Before: 0x%02X\n", x);         // 0x2A
    printf("After:  0x%02X\n", swapNibbles(x));  // 0xA2 (1010 0010)
    return 0;
}
```

---

### Q34. Reverse Bits of a Number ⭐⭐

```c
#include <stdio.h>

unsigned int reverseBits(unsigned int n) {
    unsigned int result = 0;
    for (int i = 0; i < 32; i++) {
        result <<= 1;          // make room for next bit
        result |= (n & 1);    // copy last bit of n
        n >>= 1;              // move to next bit of n
    }
    return result;
}

int main() {
    unsigned int n = 13;  // ...01101
    printf("Reversed: %u\n", reverseBits(n));
    return 0;
}
```

---

## ⚙️ CATEGORY 9: PREDICTED MUST-DO — IMPLEMENT YOUR OWN STRING FUNCTIONS

> **WHY:** Soliton tests if you TRULY understand C strings, not just call library functions.

---

### Q35. Implement strlen ⭐⭐⭐

```c
int myStrlen(const char *s) {
    int len = 0;
    while (s[len] != '\0') len++;
    return len;
}

// Using pointer arithmetic (shows C mastery)
int myStrlenPtr(const char *s) {
    const char *p = s;
    while (*p) p++;
    return p - s;
}
```

---

### Q36. Implement strcpy ⭐⭐⭐

```c
char* myStrcpy(char *dest, const char *src) {
    char *original = dest;
    while (*src) {
        *dest = *src;
        dest++;
        src++;
    }
    *dest = '\0';  // DON'T FORGET null terminator!
    return original;
}
```

---

### Q37. Implement strcmp ⭐⭐⭐

```c
int myStrcmp(const char *s1, const char *s2) {
    while (*s1 && *s2 && *s1 == *s2) {
        s1++;
        s2++;
    }
    return *(unsigned char *)s1 - *(unsigned char *)s2;
    // Returns: 0 if equal, negative if s1 < s2, positive if s1 > s2
}
```

---

### Q38. Implement strcat ⭐⭐

```c
char* myStrcat(char *dest, const char *src) {
    char *original = dest;
    // Move to end of dest
    while (*dest) dest++;
    // Copy src
    while (*src) {
        *dest = *src;
        dest++;
        src++;
    }
    *dest = '\0';
    return original;
}
```

---

### Q39. Implement atoi (String to Integer) ⭐⭐⭐
**This one is VERY likely — tests edge case handling**

```c
#include <stdio.h>
#include <ctype.h>

int myAtoi(const char *str) {
    int result = 0;
    int sign = 1;
    int i = 0;
    
    // Skip whitespace
    while (str[i] == ' ') i++;
    
    // Handle sign
    if (str[i] == '-') { sign = -1; i++; }
    else if (str[i] == '+') { i++; }
    
    // Process digits
    while (isdigit(str[i])) {
        result = result * 10 + (str[i] - '0');
        i++;
    }
    
    return sign * result;
}

int main() {
    printf("%d\n", myAtoi("  -123abc"));  // -123
    printf("%d\n", myAtoi("42"));          // 42
    printf("%d\n", myAtoi("   +0 123"));   // 0
    return 0;
}
```

---

## 🔍 CATEGORY 10: PREDICTED MUST-DO — TWO POINTER & SEARCHING

---

### Q40. Two Sum — Find Pair with Given Sum ⭐⭐⭐

```c
#include <stdio.h>

// Simple O(n²) — safe for interview
void twoSum(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (arr[i] + arr[j] == target) {
                printf("Found: arr[%d]=%d + arr[%d]=%d = %d\n",
                       i, arr[i], j, arr[j], target);
                return;
            }
        }
    }
    printf("No pair found\n");
}

int main() {
    int arr[] = {2, 7, 11, 15};
    twoSum(arr, 4, 9);  // Found: arr[0]=2 + arr[1]=7 = 9
    return 0;
}
```

---

### Q41. Binary Search ⭐⭐⭐
**Must know — they can ask to search in a sorted array**

```c
int binarySearch(int arr[], int n, int target) {
    int left = 0, right = n - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;  // avoids overflow!
        
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    
    return -1;  // not found
}
```

**Why `left + (right - left) / 2` instead of `(left + right) / 2`?** Because `left + right` can overflow for large values!

---

### Q42. Remove Duplicates from Sorted Array (In-Place) ⭐⭐⭐

```c
#include <stdio.h>

int removeDuplicates(int arr[], int n) {
    if (n == 0) return 0;
    
    int writeIdx = 1;  // position to write next unique element
    
    for (int i = 1; i < n; i++) {
        if (arr[i] != arr[i - 1]) {
            arr[writeIdx] = arr[i];
            writeIdx++;
        }
    }
    
    return writeIdx;  // new length
}

int main() {
    int arr[] = {1, 1, 2, 2, 3, 4, 4, 5};
    int newLen = removeDuplicates(arr, 8);
    
    printf("After removing duplicates (%d elements): ", newLen);
    for (int i = 0; i < newLen; i++)
        printf("%d ", arr[i]);
    // Output: 1 2 3 4 5
    return 0;
}
```

---

### Q43. Move All Zeros to End ⭐⭐

```c
#include <stdio.h>

void moveZerosToEnd(int arr[], int n) {
    int writeIdx = 0;
    
    // Move all non-zero elements to front
    for (int i = 0; i < n; i++) {
        if (arr[i] != 0) {
            arr[writeIdx++] = arr[i];
        }
    }
    
    // Fill remaining with zeros
    while (writeIdx < n) {
        arr[writeIdx++] = 0;
    }
}

int main() {
    int arr[] = {0, 1, 0, 3, 12};
    moveZerosToEnd(arr, 5);
    for (int i = 0; i < 5; i++) printf("%d ", arr[i]);
    // Output: 1 3 12 0 0
    return 0;
}
```

---

## 🔗 CATEGORY 11: PREDICTED MUST-DO — LINKED LIST (Pure C!)

> **WHY:** Linked lists in C test pointer mastery. Soliton loves pointers.

---

### Q44. Create + Print a Singly Linked List ⭐⭐⭐

```c
#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *next;
};

struct Node* createNode(int data) {
    struct Node *node = (struct Node *)malloc(sizeof(struct Node));
    node->data = data;
    node->next = NULL;
    return node;
}

void printList(struct Node *head) {
    while (head) {
        printf("%d → ", head->data);
        head = head->next;
    }
    printf("NULL\n");
}

void insertAtEnd(struct Node **head, int data) {
    struct Node *newNode = createNode(data);
    if (*head == NULL) {
        *head = newNode;
        return;
    }
    struct Node *temp = *head;
    while (temp->next) temp = temp->next;
    temp->next = newNode;
}

void freeList(struct Node *head) {
    while (head) {
        struct Node *temp = head;
        head = head->next;
        free(temp);
    }
}

int main() {
    struct Node *head = NULL;
    insertAtEnd(&head, 10);
    insertAtEnd(&head, 20);
    insertAtEnd(&head, 30);
    
    printList(head);  // 10 → 20 → 30 → NULL
    freeList(head);
    return 0;
}
```

---

### Q45. Reverse a Linked List ⭐⭐⭐
**Classic C pointer question**

```c
struct Node* reverseList(struct Node *head) {
    struct Node *prev = NULL;
    struct Node *current = head;
    struct Node *next = NULL;
    
    while (current) {
        next = current->next;     // save next
        current->next = prev;     // reverse pointer
        prev = current;           // move prev forward
        current = next;           // move current forward
    }
    
    return prev;  // new head
}

// Trace for 1→2→3→NULL:
// Step 1: prev=NULL, curr=1 → 1->next=NULL, prev=1, curr=2
// Step 2: prev=1,    curr=2 → 2->next=1,    prev=2, curr=3
// Step 3: prev=2,    curr=3 → 3->next=2,    prev=3, curr=NULL
// Result: 3→2→1→NULL, return prev=3
```

---

### Q46. Detect Cycle in Linked List (Floyd's Algorithm) ⭐⭐

```c
int hasCycle(struct Node *head) {
    struct Node *slow = head, *fast = head;
    
    while (fast && fast->next) {
        slow = slow->next;           // moves 1 step
        fast = fast->next->next;     // moves 2 steps
        
        if (slow == fast) return 1;  // cycle detected!
    }
    
    return 0;  // no cycle
}
```

---

## 🌀 CATEGORY 12: PREDICTED MUST-DO — MATRIX EXTRAS

---

### Q47. Spiral Matrix Print ⭐⭐⭐
**Very common in C interviews for systems companies**

```c
#include <stdio.h>

void spiralPrint(int rows, int cols, int mat[rows][cols]) {
    int top = 0, bottom = rows - 1;
    int left = 0, right = cols - 1;
    
    while (top <= bottom && left <= right) {
        // → Right
        for (int i = left; i <= right; i++)
            printf("%d ", mat[top][i]);
        top++;
        
        // ↓ Down
        for (int i = top; i <= bottom; i++)
            printf("%d ", mat[i][right]);
        right--;
        
        // ← Left
        if (top <= bottom) {
            for (int i = right; i >= left; i--)
                printf("%d ", mat[bottom][i]);
            bottom--;
        }
        
        // ↑ Up
        if (left <= right) {
            for (int i = bottom; i >= top; i--)
                printf("%d ", mat[i][left]);
            left++;
        }
    }
    printf("\n");
}

int main() {
    int mat[3][4] = {
        { 1,  2,  3,  4},
        { 5,  6,  7,  8},
        { 9, 10, 11, 12}
    };
    spiralPrint(3, 4, mat);
    // Output: 1 2 3 4 8 12 11 10 9 5 6 7
    return 0;
}
```

---

## 🔄 CATEGORY 13: PREDICTED MUST-DO — RECURSION (They Trace These!)

---

### Q48. GCD using Euclid's Algorithm ⭐⭐⭐

```c
// Recursive (elegant)
int gcd(int a, int b) {
    if (b == 0) return a;
    return gcd(b, a % b);
}

// LCM using GCD
int lcm(int a, int b) {
    return (a / gcd(a, b)) * b;  // divide first to avoid overflow!
}

// Trace: gcd(48, 18)
// gcd(48, 18) → gcd(18, 48%18=12) → gcd(12, 18%12=6) → gcd(6, 12%6=0) → return 6
```

---

### Q49. Power Function (x^n) ⭐⭐

```c
// Simple recursive
int power(int base, int exp) {
    if (exp == 0) return 1;
    return base * power(base, exp - 1);
}

// Fast power O(log n) — IMPRESSIVE in interview
int fastPower(int base, int exp) {
    if (exp == 0) return 1;
    if (exp % 2 == 0) {
        int half = fastPower(base, exp / 2);
        return half * half;
    } else {
        return base * fastPower(base, exp - 1);
    }
}

// fastPower(2, 10):
// = fastPower(2,5)² = (2 * fastPower(2,4))² = (2 * fastPower(2,2)²)²
// Much fewer multiplications than 2*2*2*2*2*2*2*2*2*2
```

---

## 📦 CATEGORY 14: PREDICTED MUST-DO — EMBEDDED / SYSTEMS FOCUSED

> **WHY:** Soliton is an embedded systems company. These show you think like their engineers.

---

### Q50. Reverse Words in a String ⭐⭐⭐
**"Hello World Soliton" → "Soliton World Hello"**

```c
#include <stdio.h>
#include <string.h>

// Helper: reverse portion of string
void reverseRange(char *s, int left, int right) {
    while (left < right) {
        char temp = s[left];
        s[left] = s[right];
        s[right] = temp;
        left++;
        right--;
    }
}

void reverseWords(char *s) {
    int len = strlen(s);
    
    // Step 1: Reverse entire string
    reverseRange(s, 0, len - 1);
    // "Hello World" → "dlroW olleH"
    
    // Step 2: Reverse each word individually
    int start = 0;
    for (int i = 0; i <= len; i++) {
        if (s[i] == ' ' || s[i] == '\0') {
            reverseRange(s, start, i - 1);
            start = i + 1;
        }
    }
    // "dlroW olleH" → "World Hello"
}

int main() {
    char s[] = "Hello World Soliton";
    reverseWords(s);
    printf("%s\n", s);  // Output: Soliton World Hello
    return 0;
}
```

---

### Q51. String Compression ⭐⭐
**"aaabbbcc" → "a3b3c2"**

```c
#include <stdio.h>
#include <string.h>

void compress(const char *str, char *result) {
    int len = strlen(str);
    int j = 0;
    
    for (int i = 0; i < len; ) {
        char current = str[i];
        int count = 0;
        
        while (i < len && str[i] == current) {
            count++;
            i++;
        }
        
        result[j++] = current;
        // Convert count to string
        if (count > 1) {
            j += sprintf(&result[j], "%d", count);
        }
    }
    result[j] = '\0';
}

int main() {
    char result[200];
    compress("aaabbbcc", result);
    printf("%s\n", result);  // a3b3c2
    
    compress("aabbccdd", result);
    printf("%s\n", result);  // a2b2c2d2
    return 0;
}
```

---

### Q52. Check if Two Strings are Anagrams ⭐⭐

```c
#include <stdio.h>
#include <string.h>

int isAnagram(const char *s1, const char *s2) {
    if (strlen(s1) != strlen(s2)) return 0;
    
    int freq[256] = {0};
    
    for (int i = 0; s1[i]; i++) freq[(unsigned char)s1[i]]++;
    for (int i = 0; s2[i]; i++) freq[(unsigned char)s2[i]]--;
    
    for (int i = 0; i < 256; i++)
        if (freq[i] != 0) return 0;
    
    return 1;
}

int main() {
    printf("%s\n", isAnagram("listen", "silent") ? "Anagram" : "Not anagram");  // Anagram
    printf("%s\n", isAnagram("hello", "world") ? "Anagram" : "Not anagram");    // Not
    return 0;
}
```

---

### Q53. Byte/Endianness Swap (32-bit) ⭐⭐
**Soliton = embedded → endianness conversion is CRITICAL**

```c
#include <stdio.h>

unsigned int swapEndianness(unsigned int x) {
    return ((x & 0xFF000000) >> 24) |
           ((x & 0x00FF0000) >> 8)  |
           ((x & 0x0000FF00) << 8)  |
           ((x & 0x000000FF) << 24);
}

int main() {
    unsigned int x = 0x12345678;
    printf("Original:  0x%08X\n", x);                // 0x12345678
    printf("Swapped:   0x%08X\n", swapEndianness(x)); // 0x78563412
    return 0;
}
```

---

### Q54. Implement a Simple Circular Buffer (Ring Buffer) ⭐⭐
**VERY embedded — used in UART, sensor data, etc.**

```c
#include <stdio.h>

#define BUFFER_SIZE 5

typedef struct {
    int data[BUFFER_SIZE];
    int head;   // write position
    int tail;   // read position
    int count;  // number of elements
} CircularBuffer;

void initBuffer(CircularBuffer *cb) {
    cb->head = 0;
    cb->tail = 0;
    cb->count = 0;
}

int isFull(CircularBuffer *cb) { return cb->count == BUFFER_SIZE; }
int isEmpty(CircularBuffer *cb) { return cb->count == 0; }

void enqueue(CircularBuffer *cb, int value) {
    if (isFull(cb)) {
        printf("Buffer full! Overwriting oldest.\n");
        cb->tail = (cb->tail + 1) % BUFFER_SIZE;  // discard oldest
        cb->count--;
    }
    cb->data[cb->head] = value;
    cb->head = (cb->head + 1) % BUFFER_SIZE;  // wrap around!
    cb->count++;
}

int dequeue(CircularBuffer *cb) {
    if (isEmpty(cb)) {
        printf("Buffer empty!\n");
        return -1;
    }
    int value = cb->data[cb->tail];
    cb->tail = (cb->tail + 1) % BUFFER_SIZE;
    cb->count--;
    return value;
}

int main() {
    CircularBuffer cb;
    initBuffer(&cb);
    
    enqueue(&cb, 10);
    enqueue(&cb, 20);
    enqueue(&cb, 30);
    
    printf("Dequeued: %d\n", dequeue(&cb));  // 10
    printf("Dequeued: %d\n", dequeue(&cb));  // 20
    
    enqueue(&cb, 40);
    enqueue(&cb, 50);
    enqueue(&cb, 60);
    enqueue(&cb, 70);  // wraps around
    
    while (!isEmpty(&cb))
        printf("Dequeued: %d\n", dequeue(&cb));
    // 30, 40, 50, 60, 70
    
    return 0;
}
```

---

### Q55. Find First Non-Repeating Character in String ⭐⭐

```c
#include <stdio.h>
#include <string.h>

char firstNonRepeating(const char *str) {
    int freq[256] = {0};
    
    for (int i = 0; str[i]; i++)
        freq[(unsigned char)str[i]]++;
    
    for (int i = 0; str[i]; i++)
        if (freq[(unsigned char)str[i]] == 1)
            return str[i];
    
    return '\0';  // all repeated
}

int main() {
    printf("First non-repeating: '%c'\n", firstNonRepeating("aabcbdef"));  // 'c'
    printf("First non-repeating: '%c'\n", firstNonRepeating("soliton"));   // 's'
    return 0;
}
```

---

### Q56. Merge Two Sorted Arrays ⭐⭐

```c
#include <stdio.h>

void mergeSorted(int a[], int m, int b[], int n, int result[]) {
    int i = 0, j = 0, k = 0;
    
    while (i < m && j < n) {
        if (a[i] <= b[j])
            result[k++] = a[i++];
        else
            result[k++] = b[j++];
    }
    
    while (i < m) result[k++] = a[i++];
    while (j < n) result[k++] = b[j++];
}

int main() {
    int a[] = {1, 3, 5, 7};
    int b[] = {2, 4, 6, 8, 10};
    int result[9];
    
    mergeSorted(a, 4, b, 5, result);
    
    for (int i = 0; i < 9; i++) printf("%d ", result[i]);
    // Output: 1 2 3 4 5 6 7 8 10
    return 0;
}
```

---

## 🔥 CATEGORY 15: MORE ARRAY MUST-DO

---

### Q57. Jumping Numbers (SOLITON REPORTED!) ⭐⭐⭐
**Reported:** Scribd interview experience — **exact question**

> A jumping number is a number where adjacent digits differ by 1.
> E.g., 7, 10, 12, 21, 23, 32, 34, 45, 56, 67, 78, 89, 98, 101, 121...

```c
#include <stdio.h>
#include <stdlib.h>

void printJumpingNumbers(int limit) {
    printf("Jumping numbers up to %d:\n", limit);

    // Single digits are always jumping
    for (int i = 0; i <= 9 && i <= limit; i++)
        printf("%d ", i);

    // BFS-like: start from 1-9, build by appending digit ±1
    int queue[10000];
    int front = 0, rear = 0;

    for (int i = 1; i <= 9; i++)
        queue[rear++] = i;

    while (front < rear) {
        int num = queue[front++];
        if (num > limit) continue;

        int lastDigit = num % 10;

        // Append lastDigit - 1
        if (lastDigit > 0) {
            int next = num * 10 + (lastDigit - 1);
            if (next <= limit) {
                printf("%d ", next);
                queue[rear++] = next;
            }
        }

        // Append lastDigit + 1
        if (lastDigit < 9) {
            int next = num * 10 + (lastDigit + 1);
            if (next <= limit) {
                printf("%d ", next);
                queue[rear++] = next;
            }
        }
    }
    printf("\n");
}

int main() {
    printJumpingNumbers(50);
    // 0 1 2 3 4 5 6 7 8 9 10 12 21 23 32 34 43 45
    return 0;
}
```

---

### Q58. Left Rotate Array by K Positions ⭐⭐⭐

```c
#include <stdio.h>

void reverse(int arr[], int start, int end) {
    while (start < end) {
        int temp = arr[start];
        arr[start] = arr[end];
        arr[end] = temp;
        start++; end--;
    }
}

void leftRotate(int arr[], int n, int k) {
    k = k % n;              // handle k > n
    reverse(arr, 0, k - 1);    // reverse first k
    reverse(arr, k, n - 1);    // reverse rest
    reverse(arr, 0, n - 1);    // reverse all
}

int main() {
    int arr[] = {1, 2, 3, 4, 5, 6, 7};
    leftRotate(arr, 7, 3);
    for (int i = 0; i < 7; i++) printf("%d ", arr[i]);
    // Output: 4 5 6 7 1 2 3
    return 0;
}
```

**Trick:** Reverse first K → Reverse rest → Reverse all. O(n) time, O(1) space!

---

### Q59. Find Missing Number (1 to N) ⭐⭐⭐

```c
#include <stdio.h>

int findMissing(int arr[], int n) {
    // Expected sum of 1..n+1
    int totalSum = (n + 1) * (n + 2) / 2;
    int arrSum = 0;
    for (int i = 0; i < n; i++)
        arrSum += arr[i];
    return totalSum - arrSum;
}

int main() {
    int arr[] = {1, 2, 4, 5, 6};  // missing 3
    printf("Missing: %d\n", findMissing(arr, 5));  // 3
    return 0;
}
```

---

### Q60. Find Duplicate Number ⭐⭐

```c
#include <stdio.h>

int findDuplicate(int arr[], int n) {
    // XOR approach: XOR all array elements with 1..n-1
    int xorArr = 0, xorRange = 0;
    for (int i = 0; i < n; i++) xorArr ^= arr[i];
    for (int i = 1; i < n; i++) xorRange ^= i;
    return xorArr ^ xorRange;  // duplicate!
}

int main() {
    int arr[] = {1, 3, 4, 2, 2};
    printf("Duplicate: %d\n", findDuplicate(arr, 5));  // 2
    return 0;
}
```

---

### Q61. Leaders in an Array ⭐⭐
> An element is a leader if no element to its RIGHT is greater.

```c
#include <stdio.h>

void printLeaders(int arr[], int n) {
    int maxFromRight = arr[n - 1];
    printf("%d ", maxFromRight);  // rightmost is always a leader

    for (int i = n - 2; i >= 0; i--) {
        if (arr[i] >= maxFromRight) {
            maxFromRight = arr[i];
            printf("%d ", arr[i]);
        }
    }
    printf("\n");
}

int main() {
    int arr[] = {16, 17, 4, 3, 5, 2};
    printLeaders(arr, 6);  // 2 5 17 (printed right to left)
    return 0;
}
```

---

### Q62. Frequency of Each Element ⭐⭐

```c
#include <stdio.h>

void printFrequency(int arr[], int n) {
    int visited[100] = {0};  // track already counted

    for (int i = 0; i < n; i++) {
        if (visited[i]) continue;

        int count = 1;
        for (int j = i + 1; j < n; j++) {
            if (arr[i] == arr[j]) {
                count++;
                visited[j] = 1;
            }
        }
        printf("%d appears %d time(s)\n", arr[i], count);
    }
}

int main() {
    int arr[] = {1, 2, 2, 3, 1, 3, 3};
    printFrequency(arr, 7);
    return 0;
}
```

---

### Q63. Intersection of Two Arrays ⭐⭐

```c
#include <stdio.h>

void intersection(int a[], int m, int b[], int n) {
    printf("Intersection: ");
    for (int i = 0; i < m; i++) {
        int found = 0;
        // Check if a[i] already printed (avoid duplicates)
        for (int k = 0; k < i; k++)
            if (a[k] == a[i]) { found = 1; break; }
        if (found) continue;

        for (int j = 0; j < n; j++) {
            if (a[i] == b[j]) {
                printf("%d ", a[i]);
                break;
            }
        }
    }
    printf("\n");
}

int main() {
    int a[] = {1, 2, 3, 4, 5};
    int b[] = {3, 4, 5, 6, 7};
    intersection(a, 5, b, 5);  // 3 4 5
    return 0;
}
```

---

### Q64. Union of Two Arrays ⭐⭐

```c
#include <stdio.h>

int contains(int arr[], int n, int val) {
    for (int i = 0; i < n; i++)
        if (arr[i] == val) return 1;
    return 0;
}

void unionArrays(int a[], int m, int b[], int n) {
    int result[200], k = 0;

    for (int i = 0; i < m; i++) {
        if (!contains(result, k, a[i]))
            result[k++] = a[i];
    }
    for (int i = 0; i < n; i++) {
        if (!contains(result, k, b[i]))
            result[k++] = b[i];
    }

    printf("Union: ");
    for (int i = 0; i < k; i++) printf("%d ", result[i]);
    printf("\n");
}

int main() {
    int a[] = {1, 2, 3, 4};
    int b[] = {3, 4, 5, 6};
    unionArrays(a, 4, b, 4);  // 1 2 3 4 5 6
    return 0;
}
```

---

## 🔥 CATEGORY 16: MORE NUMBER PROBLEMS

---

### Q65. Reverse a Number ⭐⭐⭐

```c
#include <stdio.h>

int reverseNumber(int n) {
    int reversed = 0;
    int negative = (n < 0);
    if (negative) n = -n;

    while (n > 0) {
        reversed = reversed * 10 + n % 10;
        n /= 10;
    }

    return negative ? -reversed : reversed;
}

int main() {
    printf("%d\n", reverseNumber(12345));   // 54321
    printf("%d\n", reverseNumber(-789));    // -987
    return 0;
}
```

---

### Q66. Sum of Digits ⭐⭐

```c
int sumOfDigits(int n) {
    if (n < 0) n = -n;
    int sum = 0;
    while (n > 0) {
        sum += n % 10;
        n /= 10;
    }
    return sum;
}
// sumOfDigits(1234) = 1+2+3+4 = 10
```

---

### Q67. Decimal to Binary ⭐⭐

```c
#include <stdio.h>

void decimalToBinary(int n) {
    if (n == 0) { printf("0"); return; }

    int bits[32], count = 0;
    int neg = (n < 0);
    if (neg) n = -n;

    while (n > 0) {
        bits[count++] = n % 2;
        n /= 2;
    }

    if (neg) printf("-");
    for (int i = count - 1; i >= 0; i--)
        printf("%d", bits[i]);
}

int main() {
    decimalToBinary(13);    // 1101
    printf("\n");
    decimalToBinary(255);   // 11111111
    printf("\n");
    return 0;
}
```

---

### Q68. Check Power of N ⭐⭐

```c
int isPowerOfN(int num, int base) {
    if (num <= 0) return 0;
    while (num > 1) {
        if (num % base != 0) return 0;
        num /= base;
    }
    return 1;
}
// isPowerOfN(27, 3) = 1 (3^3=27)
// isPowerOfN(20, 3) = 0
```

---

### Q69. N-th Fibonacci Number (Iterative) ⭐⭐

```c
int fibonacci(int n) {
    if (n <= 1) return n;
    int a = 0, b = 1;
    for (int i = 2; i <= n; i++) {
        int temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}
// fibonacci(10) = 55
```

---

## 🔥 CATEGORY 17: MORE STRING PROBLEMS

---

### Q70. Count Vowels and Consonants ⭐⭐

```c
#include <stdio.h>
#include <ctype.h>

void countVowelsConsonants(const char *str) {
    int vowels = 0, consonants = 0;

    for (int i = 0; str[i]; i++) {
        char c = tolower(str[i]);
        if (isalpha(c)) {
            if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u')
                vowels++;
            else
                consonants++;
        }
    }

    printf("Vowels: %d, Consonants: %d\n", vowels, consonants);
}

int main() {
    countVowelsConsonants("Hello World");  // V:3, C:7
    return 0;
}
```

---

### Q71. Remove Duplicates from String ⭐⭐

```c
#include <stdio.h>
#include <string.h>

void removeDuplicates(char *str) {
    int seen[256] = {0};
    int j = 0;

    for (int i = 0; str[i]; i++) {
        if (!seen[(unsigned char)str[i]]) {
            seen[(unsigned char)str[i]] = 1;
            str[j++] = str[i];
        }
    }
    str[j] = '\0';
}

int main() {
    char str[] = "programming";
    removeDuplicates(str);
    printf("%s\n", str);  // "progamin"
    return 0;
}
```

---

### Q72. Check if String is Rotation of Another ⭐⭐

```c
#include <stdio.h>
#include <string.h>

int isRotation(const char *s1, const char *s2) {
    int len = strlen(s1);
    if (len != (int)strlen(s2)) return 0;

    // Concatenate s1 with itself, check if s2 is a substring
    char doubled[200];
    strcpy(doubled, s1);
    strcat(doubled, s1);

    return strstr(doubled, s2) != NULL;
}

int main() {
    printf("%d\n", isRotation("abcde", "cdeab"));   // 1 (true)
    printf("%d\n", isRotation("abcde", "abced"));   // 0 (false)
    return 0;
}
```

**Trick:** If B is a rotation of A, then B is always a substring of A+A!

---

### Q73. Convert String to Uppercase/Lowercase ⭐

```c
void toUpperCase(char *str) {
    for (int i = 0; str[i]; i++)
        if (str[i] >= 'a' && str[i] <= 'z')
            str[i] -= 32;  // 'a'-'A' = 32
}

void toLowerCase(char *str) {
    for (int i = 0; str[i]; i++)
        if (str[i] >= 'A' && str[i] <= 'Z')
            str[i] += 32;
}
```

---

### Q74. Remove All Spaces from String ⭐

```c
void removeSpaces(char *str) {
    int j = 0;
    for (int i = 0; str[i]; i++) {
        if (str[i] != ' ')
            str[j++] = str[i];
    }
    str[j] = '\0';
}
// "hello world" → "helloworld"
```

---

## 🔥 CATEGORY 18: STACK & QUEUE (Using Arrays in C)

---

### Q75. Implement Stack Using Array ⭐⭐⭐

```c
#include <stdio.h>
#define MAX 100

typedef struct {
    int data[MAX];
    int top;
} Stack;

void init(Stack *s) { s->top = -1; }
int isEmpty(Stack *s) { return s->top == -1; }
int isFull(Stack *s) { return s->top == MAX - 1; }

void push(Stack *s, int val) {
    if (isFull(s)) { printf("Stack overflow!\n"); return; }
    s->data[++(s->top)] = val;
}

int pop(Stack *s) {
    if (isEmpty(s)) { printf("Stack underflow!\n"); return -1; }
    return s->data[(s->top)--];
}

int peek(Stack *s) {
    if (isEmpty(s)) return -1;
    return s->data[s->top];
}

int main() {
    Stack s;
    init(&s);
    push(&s, 10); push(&s, 20); push(&s, 30);
    printf("Top: %d\n", peek(&s));     // 30
    printf("Popped: %d\n", pop(&s));   // 30
    printf("Top: %d\n", peek(&s));     // 20
    return 0;
}
```

---

### Q76. Implement Queue Using Array ⭐⭐⭐

```c
#include <stdio.h>
#define MAX 100

typedef struct {
    int data[MAX];
    int front, rear;
} Queue;

void init(Queue *q) { q->front = 0; q->rear = -1; }
int isEmpty(Queue *q) { return q->rear < q->front; }

void enqueue(Queue *q, int val) {
    if (q->rear >= MAX - 1) { printf("Queue full!\n"); return; }
    q->data[++(q->rear)] = val;
}

int dequeue(Queue *q) {
    if (isEmpty(q)) { printf("Queue empty!\n"); return -1; }
    return q->data[(q->front)++];
}

int main() {
    Queue q;
    init(&q);
    enqueue(&q, 10); enqueue(&q, 20); enqueue(&q, 30);
    printf("Dequeued: %d\n", dequeue(&q));  // 10
    printf("Dequeued: %d\n", dequeue(&q));  // 20
    return 0;
}
```

---

## 🔥 CATEGORY 19: MATRIX EXTRAS

---

### Q77. Sum of Matrix Diagonals ⭐⭐

```c
#include <stdio.h>

void diagonalSum(int n, int mat[n][n]) {
    int primarySum = 0, secondarySum = 0;

    for (int i = 0; i < n; i++) {
        primarySum += mat[i][i];           // top-left to bottom-right
        secondarySum += mat[i][n - 1 - i]; // top-right to bottom-left
    }

    printf("Primary diagonal sum: %d\n", primarySum);
    printf("Secondary diagonal sum: %d\n", secondarySum);
}

int main() {
    int mat[3][3] = {{1,2,3}, {4,5,6}, {7,8,9}};
    diagonalSum(3, mat);
    // Primary: 1+5+9 = 15
    // Secondary: 3+5+7 = 15
    return 0;
}
```

---

### Q78. Search Element in Row-wise & Column-wise Sorted Matrix ⭐⭐

```c
#include <stdio.h>

void searchSortedMatrix(int n, int m, int mat[n][m], int target) {
    // Start from top-right corner
    int row = 0, col = m - 1;

    while (row < n && col >= 0) {
        if (mat[row][col] == target) {
            printf("Found at (%d, %d)\n", row, col);
            return;
        } else if (mat[row][col] > target) {
            col--;    // move left
        } else {
            row++;    // move down
        }
    }
    printf("Not found\n");
}

int main() {
    int mat[3][3] = {{1,4,7}, {2,5,8}, {3,6,9}};
    searchSortedMatrix(3, 3, mat, 5);  // Found at (1, 1)
    return 0;
}
```

**O(n+m)** — much better than brute force O(n×m)!

---

## 🔥 CATEGORY 20: RECURSION EXTRAS

---

### Q79. Tower of Hanoi ⭐⭐

```c
#include <stdio.h>

void towerOfHanoi(int n, char from, char to, char aux) {
    if (n == 1) {
        printf("Move disk 1 from %c to %c\n", from, to);
        return;
    }
    towerOfHanoi(n - 1, from, aux, to);       // move n-1 disks to auxiliary
    printf("Move disk %d from %c to %c\n", n, from, to);
    towerOfHanoi(n - 1, aux, to, from);       // move n-1 disks from aux to target
}

int main() {
    towerOfHanoi(3, 'A', 'C', 'B');
    // 7 moves for 3 disks (2^n - 1 moves)
    return 0;
}
```

---

### Q80. Sum of Array Using Recursion ⭐

```c
int sumArray(int arr[], int n) {
    if (n == 0) return 0;
    return arr[n - 1] + sumArray(arr, n - 1);
}
// sumArray({1,2,3,4,5}, 5) = 15
```

---

### Q81. Print All Permutations of a String ⭐⭐

```c
#include <stdio.h>
#include <string.h>

void swap(char *a, char *b) {
    char temp = *a; *a = *b; *b = temp;
}

void permute(char *str, int left, int right) {
    if (left == right) {
        printf("%s\n", str);
        return;
    }

    for (int i = left; i <= right; i++) {
        swap(&str[left], &str[i]);
        permute(str, left + 1, right);
        swap(&str[left], &str[i]);  // backtrack
    }
}

int main() {
    char str[] = "ABC";
    permute(str, 0, strlen(str) - 1);
    // ABC, ACB, BAC, BCA, CBA, CAB
    return 0;
}
```

---

## 🏆 STRATEGY TO 100% CRACK THE ROUND

### ✅ Before Coding:
1. **READ THE PROBLEM TWICE** — Don't miss edge cases
2. **Explain your logic FIRST** — They specifically ask for this
3. **Ask about input format** — Is it `"[1,2,3]"` string or `scanf` integers?

### ✅ While Coding:
4. **Start with `#include`** — Many forget `<string.h>`, `<stdlib.h>`, `<math.h>`
5. **Always write `main()`** — Don't just write the function
6. **Handle edge cases**: empty array, single element, all negative, all same
7. **Use meaningful variable names** — Not `i, j, k` everywhere

### ✅ Common Mistakes to Avoid:
8. **Forgetting `\0` in strings** — `strlen("hello")` = 5, but array needs 6 slots
9. **Using `==` for string comparison** — Use `strcmp()`, not `str1 == str2`
10. **Integer division** — `5/2 = 2` in C, not 2.5!
11. **Array out of bounds** — If `n=5`, valid indices are `0 to 4`
12. **Not freeing `malloc` memory** — Always `free()` what you `malloc`

### ✅ ULTIMATE Top 20 Questions (Ranked by Likelihood):

| # | Question | Priority | Type |
|---|----------|----------|------|
| 1 | **Rotate Matrix 90°** | 🔴 MUST | Reported |
| 2 | **Maximum Subarray Sum** | 🔴 MUST | Reported |
| 3 | **Input Parsing (string → array)** | 🔴 MUST | Reported |
| 4 | **Longest Zero-Sum Subarray** | 🔴 MUST | Reported |
| 5 | **Unique Strings (case-insensitive)** | 🔴 MUST | Reported |
| 6 | **Count Set Bits** | 🔴 MUST | Predicted |
| 7 | **Swap Without Temp (XOR)** | 🔴 MUST | Predicted |
| 8 | **Implement strlen/strcpy/strcmp** | 🔴 MUST | Predicted |
| 9 | **Reverse a String** | 🟡 HIGH | Reported |
| 10 | **Valid Parentheses (Stack)** | 🟡 HIGH | Reported |
| 11 | **Binary Search** | 🟡 HIGH | Predicted |
| 12 | **Reverse Linked List** | 🟡 HIGH | Predicted |
| 13 | **Two Sum** | 🟡 HIGH | Predicted |
| 14 | **Spiral Matrix Print** | 🟡 HIGH | Predicted |
| 15 | **GCD (Euclid's)** | 🟡 HIGH | Predicted |
| 16 | **Endianness Swap** | 🟡 HIGH | Predicted |
| 17 | **Star/Number Patterns** | 🟡 HIGH | Reported |
| 18 | **Prime/Palindrome/Armstrong** | 🟡 HIGH | Reported |
| 19 | **Circular Buffer** | 🟢 BONUS | Predicted |
| 20 | **String Compression** | 🟢 BONUS | Predicted |

---

> **🎯 This document now has 81 questions — 28 REPORTED + 25 PREDICTED + 28 MORE BONUS. But questions alone don't guarantee cracking. The sections below WILL.**

---

# 🛡️ PART 2: THE BULLETPROOF SECTIONS

---

## 📍 SECTION A: STEP-BY-STEP DRY RUNS (Top 5 Most-Asked)

> **WHY THIS MATTERS:** Soliton asks you to EXPLAIN LOGIC BEFORE CODING. If you can't walk through a dry run on paper, you FAIL before writing a single line of code.

---

### DRY RUN 1: Rotate Matrix 90° (THE #1 Soliton question)

```
Input:                Step 1: TRANSPOSE              Step 2: REVERSE EACH ROW
┌───┬───┬───┐        ┌───┬───┬───┐                  ┌───┬───┬───┐
│ 1 │ 2 │ 3 │        │ 1 │ 4 │ 7 │                  │ 7 │ 4 │ 1 │
├───┼───┼───┤   →    ├───┼───┼───┤        →         ├───┼───┼───┤
│ 4 │ 5 │ 6 │        │ 2 │ 5 │ 8 │                  │ 8 │ 5 │ 2 │
├───┼───┼───┤        ├───┼───┼───┤                  ├───┼───┼───┤
│ 7 │ 8 │ 9 │        │ 3 │ 6 │ 9 │                  │ 9 │ 6 │ 3 │
└───┴───┴───┘        └───┴───┴───┘                  └───┴───┴───┘

TRANSPOSE means: swap mat[i][j] with mat[j][i] for i < j
  swap(mat[0][1], mat[1][0]) → swap(2, 4)
  swap(mat[0][2], mat[2][0]) → swap(3, 7)
  swap(mat[1][2], mat[2][1]) → swap(6, 8)

REVERSE EACH ROW:
  Row 0: [1,4,7] → swap first & last → [7,4,1] ✅
  Row 1: [2,5,8] → swap first & last → [8,5,2] ✅
  Row 2: [3,6,9] → swap first & last → [9,6,3] ✅
```

**How to explain in 30 seconds:**
> "I'll do it in 2 steps: First transpose the matrix by swapping elements across the diagonal. Then reverse each row. This gives us a 90° clockwise rotation in-place with O(1) extra space."

---

### DRY RUN 2: Kadane's Algorithm (Maximum Subarray Sum)

```
Input: [-2, 1, -3, 4, -1, 2, 1, -5, 4]

i=0: arr[i]=-2  maxEndingHere = max(-2, 0+(-2)) = -2   maxSoFar = -2
i=1: arr[i]=1   maxEndingHere = max(1, -2+1) = 1       maxSoFar = 1
i=2: arr[i]=-3  maxEndingHere = max(-3, 1+(-3)) = -2   maxSoFar = 1
i=3: arr[i]=4   maxEndingHere = max(4, -2+4) = 4       maxSoFar = 4
i=4: arr[i]=-1  maxEndingHere = max(-1, 4+(-1)) = 3    maxSoFar = 4
i=5: arr[i]=2   maxEndingHere = max(2, 3+2) = 5        maxSoFar = 5
i=6: arr[i]=1   maxEndingHere = max(1, 5+1) = 6        maxSoFar = 6  ← ANSWER!
i=7: arr[i]=-5  maxEndingHere = max(-5, 6+(-5)) = 1    maxSoFar = 6
i=8: arr[i]=4   maxEndingHere = max(4, 1+4) = 5        maxSoFar = 6

Answer: 6 (subarray [4, -1, 2, 1])
```

**How to explain:**
> "At each element I decide: is it better to extend my previous subarray or start fresh? I track the best answer I've seen so far. One pass, O(n) time."

---

### DRY RUN 3: Longest Zero-Sum Subarray

```
Input: [1, 2, -3, 3, 1, -1, -2]

i=0: Try sums starting at index 0:
  j=0: sum= 1
  j=1: sum= 3
  j=2: sum= 0 → length 3! [1, 2, -3] ← save
  j=3: sum= 3
  j=4: sum= 4
  j=5: sum= 3
  j=6: sum= 1

i=1: Try sums starting at index 1:
  j=1: sum= 2
  j=2: sum=-1
  j=3: sum= 2
  j=4: sum= 3
  j=5: sum= 2 → sum=2+(-3)+3+1+(-1) = 2, not 0
  j=6: sum= 0 → length 6! [2, -3, 3, 1, -1, -2] ← BETTER! save

i=2 onwards: nothing beats length 6

Answer: [2, -3, 3, 1, -1, -2] (length 6, starting at index 1)
```

---

### DRY RUN 4: Reverse Linked List

```
Initial:  1 → 2 → 3 → NULL
          prev=NULL, curr=1

Step 1:   next = curr->next (= 2)
          curr->next = prev (1→NULL)
          prev = curr (prev=1)
          curr = next (curr=2)
          
          NULL ← 1    2 → 3 → NULL
                prev  curr

Step 2:   next = curr->next (= 3)
          curr->next = prev (2→1)
          prev = curr (prev=2)
          curr = next (curr=3)
          
          NULL ← 1 ← 2    3 → NULL
                      prev  curr

Step 3:   next = curr->next (= NULL)
          curr->next = prev (3→2)
          prev = curr (prev=3)
          curr = next (curr=NULL)
          
          NULL ← 1 ← 2 ← 3
                          prev  curr=NULL → STOP!

Return prev (= 3). New list: 3 → 2 → 1 → NULL ✅
```

---

### DRY RUN 5: Input Parsing "[1, -3, 5, 7]" → Array

```
Input string: "[1, -3, 5, 7]"

i=0: '[' → skip (not digit, not '-')
i=1: '1' → digit! num=1. i=2: ',' not digit → stop. arr[0]=1

Skip ',', ' '
i=4: '-' → sign=-1. i=5: '3' → num=3. i=6: ',' → stop. arr[1]=-3

Skip ',', ' '
i=8: '5' → num=5. i=9: ',' → stop. arr[2]=5

Skip ',', ' '
i=11: '7' → num=7. i=12: ']' → stop. arr[3]=7

Result: arr = {1, -3, 5, 7}, size = 4 ✅
```

**KEY GOTCHA:** If input is `"[10, -20, 300]"`, the `10` is TWO digits. Your parser must loop on `isdigit()` to build multi-digit numbers!

---

## 🚨 SECTION B: EDGE CASES THAT WILL FAIL YOUR CODE

> **This is where 80% of candidates lose marks.** Soliton has HIDDEN TEST CASES.

### For EVERY Array Problem, Test These:

| Edge Case | Example | What Breaks |
|-----------|---------|-------------|
| **Empty array** | `n = 0` | Array access → crash |
| **Single element** | `[5]` | Loops don't execute, wrong answer |
| **All same elements** | `[3,3,3,3]` | Second smallest = not found |
| **All negative** | `[-5,-3,-1,-8]` | Kadane's must handle this! |
| **Already sorted** | `[1,2,3,4,5]` | Unsorted subarray = 0 |
| **Reverse sorted** | `[5,4,3,2,1]` | Full array is unsorted |
| **Contains zeros** | `[0,0,0]` | Zero-sum subarray = entire array |
| **Very large numbers** | `INT_MAX` | Overflow on addition! |
| **Negative numbers** | `[-1, -2, -3]` | Many algos assume positive |

### For EVERY String Problem:

| Edge Case | Example | What Breaks |
|-----------|---------|-------------|
| **Empty string** | `""` | `strlen = 0`, loop doesn't run |
| **Single char** | `"a"` | Palindrome? Yes. But check boundary |
| **All same chars** | `"aaaa"` | Compression = "a4", not "a1a1a1a1" |
| **With spaces** | `"hello world"` | `scanf("%s")` only reads "hello"! |
| **Special characters** | `"@#$%"` | `isalpha()` returns false for all |
| **Case sensitivity** | `"Hello" vs "hello"` | Are they same? Use `tolower()` |

### For Number Problems:

| Edge Case | Example | What Breaks |
|-----------|---------|-------------|
| **n = 0** | Is 0 prime? | NO. Is 0 palindrome? Debatable. |
| **n = 1** | Is 1 prime? | NO! Many forget this. |
| **n = 2** | Is 2 prime? | YES. Only even prime. |
| **Negative numbers** | `-121` | Not a palindrome (starts with -) |
| **Leading zeros** | `010` in C | That's OCTAL 8, not decimal 10! |

---

## 📝 SECTION C: C BOILERPLATE TEMPLATES (Memorize These!)

### Template 1: Standard Array Problem Boilerplate

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <limits.h>

int main() {
    int n;
    printf("Enter size: ");
    scanf("%d", &n);
    
    int arr[n];  // VLA — or use malloc for dynamic
    printf("Enter %d elements: ", n);
    for (int i = 0; i < n; i++)
        scanf("%d", &arr[i]);
    
    // ===== YOUR LOGIC HERE =====
    
    // Print result
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    printf("\n");
    
    return 0;
}
```

### Template 2: String Problem Boilerplate

```c
#include <stdio.h>
#include <string.h>
#include <ctype.h>

int main() {
    char str[1000];
    printf("Enter string: ");
    fgets(str, sizeof(str), stdin);
    
    // Remove trailing newline from fgets
    str[strcspn(str, "\n")] = '\0';
    
    int len = strlen(str);
    
    // ===== YOUR LOGIC HERE =====
    
    printf("Result: %s\n", str);
    return 0;
}
```

### Template 3: Matrix Problem Boilerplate

```c
#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);
    
    int mat[n][n];
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            scanf("%d", &mat[i][j]);
    
    // ===== YOUR LOGIC HERE =====
    
    // Print matrix
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++)
            printf("%d ", mat[i][j]);
        printf("\n");
    }
    
    return 0;
}
```

### Template 4: Dynamic Memory Boilerplate

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    int n;
    scanf("%d", &n);
    
    int *arr = (int *)malloc(n * sizeof(int));
    if (arr == NULL) {
        printf("Memory allocation failed!\n");
        return 1;
    }
    
    for (int i = 0; i < n; i++)
        scanf("%d", &arr[i]);
    
    // ===== YOUR LOGIC HERE =====
    
    free(arr);
    return 0;
}
```

### Template 5: String-to-Array Parser (THE SOLITON TRAP!)

```c
#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>

int main() {
    char input[500];
    fgets(input, sizeof(input), stdin);   // reads "[1, 2, -3, 4]"
    
    int arr[100], size = 0;
    int i = 0;
    
    while (input[i] && !isdigit(input[i]) && input[i] != '-') i++;  // skip to first number
    
    while (input[i] && input[i] != ']') {
        int sign = 1;
        if (input[i] == '-') { sign = -1; i++; }
        
        int num = 0;
        while (isdigit(input[i])) {
            num = num * 10 + (input[i] - '0');
            i++;
        }
        arr[size++] = sign * num;
        
        while (input[i] && !isdigit(input[i]) && input[i] != '-' && input[i] != ']') i++;
    }
    
    // Now arr[] has your numbers, size = count
    return 0;
}
```

---

## 🗣️ SECTION D: FOLLOW-UP QUESTIONS THEY WILL ASK

> After you solve a problem, expect these. Having answers ready = INSTANT RESPECT.

### For ANY solution:

| Follow-up | How to Answer |
|-----------|---------------|
| "What's the time complexity?" | Always know: O(n), O(n²), O(n log n), etc. |
| "What's the space complexity?" | O(1) if in-place, O(n) if extra array used |
| "Can you optimize it?" | Mention better approach even if you didn't code it |
| "What happens with large input?" | Mention overflow risks, use `long long` if needed |
| "What if input is invalid?" | "I'd add validation: check NULL, check bounds" |

### Problem-Specific Follow-ups:

| Problem | Follow-up | Answer |
|---------|-----------|--------|
| **Kadane's** | "What if all negative?" | "My code handles it — maxSoFar starts as arr[0], not 0" |
| **Kadane's** | "Print the actual subarray?" | "Track startIdx and endIdx when maxSoFar updates" |
| **Matrix Rotate** | "Rotate counter-clockwise?" | "Transpose + reverse each COLUMN (instead of row)" |
| **Matrix Rotate** | "Rotate by 180°?" | "Apply 90° rotation twice, or reverse each row then reverse each column" |
| **Binary Search** | "What if duplicates?" | "This finds ANY occurrence. For first/last, modify to continue searching" |
| **Linked List Reverse** | "Do it recursively?" | Know both iterative AND recursive versions |
| **Pattern Printing** | "Print hollow version?" | "Print * only when i==1, i==n, j==1, or j==2*i-1" |
| **String Reverse** | "Without extra array?" | "Two pointer: swap left and right, move inward" |
| **Sort** | "Which is more efficient?" | "Merge Sort O(n log n) vs Bubble O(n²). For interview, I'd use the one that's cleaner to code" |
| **Prime Check** | "Check up to 10⁹?" | "Use Sieve of Eratosthenes for multiple queries, √n check for single" |

---

## ☠️ SECTION E: 20 DEADLY MISTAKES THAT FAIL CANDIDATES

### Input/Output Mistakes:

| # | Mistake | Fix |
|---|---------|-----|
| 1 | Using `scanf("%s")` for string with spaces | Use `fgets(str, size, stdin)` |
| 2 | Not consuming `\n` after `scanf("%d")` before `fgets` | Add `getchar();` after `scanf` |
| 3 | Forgetting `&` in `scanf("%d", &n)` | ALWAYS use `&` for non-pointers |
| 4 | Wrong format specifier (`%d` for `long`) | Use `%ld` for `long`, `%lld` for `long long` |
| 5 | Not flushing output | Add `\n` at end or use `fflush(stdout)` |

### Memory Mistakes:

| # | Mistake | Fix |
|---|---------|-----|
| 6 | Forgetting to `free()` after `malloc()` | Always pair: `malloc` → `free` |
| 7 | Using memory after `free()` (dangling pointer) | Set `p = NULL` after `free(p)` |
| 8 | Buffer overflow: writing past array bounds | Always check `i < n` before `arr[i]` |
| 9 | Not checking `malloc` return for `NULL` | Always: `if (p == NULL) return;` |
| 10 | Stack overflow from deep recursion | Use iterative version or increase stack size |

### Logic Mistakes:

| # | Mistake | Fix |
|---|---------|-----|
| 11 | Off-by-one in loops: `for(i=0; i<=n)` | Should be `i < n` for array of size n |
| 12 | Comparing strings with `==` | Use `strcmp(s1, s2) == 0` |
| 13 | Integer division losing decimals: `5/2 = 2` | Cast: `(float)5/2 = 2.5` |
| 14 | `sizeof(arr)` in function = pointer size, not array | Pass size as separate parameter |
| 15 | Using uninitialized variables | Always initialize: `int sum = 0;` |

### C-Specific Traps:

| # | Mistake | Fix |
|---|---------|-----|
| 16 | `char c = 200;` → prints -56 | Use `unsigned char` for values > 127 |
| 17 | `int a = 010;` → a is 8, not 10 | Leading `0` = octal! |
| 18 | Modifying string literal: `char *s = "hello"; s[0] = 'H';` | Use `char s[] = "hello";` for modifiable |
| 19 | Missing `break` in `switch` → fall-through | Always add `break` (unless intentional) |
| 20 | `sizeof` doesn't evaluate: `sizeof(a++)` → a unchanged | Never rely on side effects inside `sizeof` |

---

## ⏰ SECTION F: 30-MINUTE-BEFORE-INTERVIEW CHEATSHEET

> **Print this. Read this in the car. Read this outside the interview room.**

### 🔵 Headers to Remember:
```c
#include <stdio.h>      // printf, scanf, fgets
#include <stdlib.h>      // malloc, free, atoi, qsort
#include <string.h>      // strlen, strcmp, strcpy, strcat, strtok, memset
#include <ctype.h>       // isdigit, isalpha, toupper, tolower
#include <math.h>        // sqrt, pow, abs
#include <limits.h>      // INT_MAX, INT_MIN
```

### 🔵 Must-Know Functions:
```
strlen(s)         → length without \0
strcmp(s1, s2)     → 0 if equal, <0 if s1<s2, >0 if s1>s2
strcpy(dest, src) → copies src to dest
strcat(dest, src) → appends src to dest
strtok(str, delim)→ tokenizes string
atoi(str)         → string to int
sprintf(buf, ...) → print to string
memset(arr, 0, n) → set n bytes to 0
qsort(arr, n, size, compare) → sort array
```

### 🔵 One-Liners to Remember:
```c
// Array size
int n = sizeof(arr) / sizeof(arr[0]);

// Swap two numbers
a = a ^ b; b = a ^ b; a = a ^ b;

// Check odd/even with bitwise
if (n & 1)  // odd
if (!(n & 1))  // even

// Min/Max of two
int max = (a > b) ? a : b;
int min = (a < b) ? a : b;

// Remove trailing newline from fgets
str[strcspn(str, "\n")] = '\0';

// Absolute value without abs()
int absVal = (n < 0) ? -n : n;
```

### 🔵 Complexity Quick Reference:
```
O(1)       → constant (bit operations, array access)
O(log n)   → binary search
O(n)       → single loop, Kadane's, linear search
O(n log n) → merge sort, qsort
O(n²)      → nested loops, bubble sort, brute force
O(2^n)     → recursion without memoization (BAD!)
```

### 🔵 The Golden Rules:
```
1. READ the problem. Then READ IT AGAIN.
2. EXPLAIN your approach before touching the keyboard.
3. ASK about input format ("Is it scanf or string?")
4. WRITE the includes first.
5. HANDLE edge cases (empty, single, negative, overflow).
6. TEST with the example input mentally.
7. FREE what you malloc.
8. If stuck: BRUTE FORCE first, optimize later.
```

---

## 🎯 SECTION G: THE ULTIMATE PRACTICE PLAN (3 Hours)

> If you have limited time, follow this EXACT order:

| Time | What to Practice | Questions |
|------|-----------------|-----------|
| **0-30 min** | Top 3 Array Problems | Kadane's (Q1), Zero-Sum (Q4), Second Smallest (Q2) |
| **30-60 min** | Matrix + Input Parsing | Rotate 90° (Q15), Parse Array (Q24) |
| **60-90 min** | Strings | Reverse (Q9), Unique Strings (Q10), Valid Parens (Q14) |
| **90-120 min** | Bit + Pointer | Set Bits (Q29), XOR Swap (Q31), strlen/strcpy (Q35-37) |
| **120-150 min** | Linked List + Search | Reverse LL (Q45), Binary Search (Q41), Two Sum (Q40) |
| **150-180 min** | Patterns + Numbers + Review | Pyramid (Q22), Prime (Q17), Spiral (Q47), Review edge cases |

### After Each Problem:
1. ✅ Can I write it WITHOUT looking? → Move on
2. ❌ Had to peek? → Do it ONE MORE TIME from scratch
3. 🤔 Got stuck on edge case? → Add it to your mental checklist

---

> **🔥 YOU HAVE 81 QUESTIONS + DRY RUNS + EDGE CASES + TEMPLATES + FOLLOW-UPS + CHEATSHEET. This is more preparation than 99% of candidates will ever do. You're not going to crack this interview — you're going to DOMINATE it. Now go practice! 💪**

---

*The most comprehensive Soliton C Programming Round preparation document ever created.  
81 questions • 5 dry-run traces • 30+ edge cases • 5 templates • 10 follow-ups • 20 deadly mistakes • Last-minute cheatsheet • 3-hour practice plan.*
