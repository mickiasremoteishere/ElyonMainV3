import { Exam } from './exams';

export const mathExam2018: Exam = {
  id: 'math-2018',
  title: 'GRADE 12 MATHEMATICS (FOR SOCIAL SCIENCE) MODEL EXAMINATIONS 2016E.C/ 2024G.C',
  subject: 'Mathematics',
  duration: 180,
  totalQuestions: 65,
  description: 'Mathematics Exam for Social Science Students',
  scheduledDate: '2026-02-27',
  status: 'ongoing',
  stream: 'both',
  password: 'MATH2018',
  questions: [
    {
      id: 1,
      text: 'The first five terms of the sequence, where a1 = 3, an = 3an−1 + 2 for all n > 1',
      options: [
        '3,15,40,110,330',
        '3,11,35,107,323',
        '3,20,45,110,330',
        '3,11,40,107,323'
      ],
      correctAnswer: 3
    },
    {
      id: 2,
      text: 'Which one of the following is a geometric series is convergent?',
      options: [
        '∑ (1/10)^n from n=1 to ∞',
        '∑ (1/2)^n from n=1 to ∞',
        '∑ (-3)^n from n=1 to ∞',
        '∑ 3^n from n=1 to ∞'
      ],
      correctAnswer: 0
    },
    {
      id: 3,
      text: 'The sum of the integers between 12 and 280 which are divisible by 13 is',
      options: [
        '2920',
        '3000',
        '3003',
        '3012'
      ],
      correctAnswer: 2
    },
    {
      id: 4,
      text: 'The income of a person is 300,000 birr in first year and he receives an increment of 1000 to his income per year for next 19 yrs. then, the total amount he received in 20 years in birr is:',
      options: [
        '790,000',
        '600,000',
        '800,000',
        '690,000'
      ],
      correctAnswer: 3
    },
    {
      id: 5,
      text: 'The sum of the series 3/4 − 5/4^2 + 3/4^3 − 5/4^4 + 3/4^5 − 5/4^6 +… is:',
      options: [
        '4/5',
        '7/15',
        '2/5',
        '1/3'
      ],
      correctAnswer: 1
    },
    {
      id: 6,
      text: 'The nth term of a GP 5, 25, 125,… is',
      options: [
        '5^(n-1)',
        '5^(n+1)',
        '5^n',
        '5^(n-2)'
      ],
      correctAnswer: 2
    },
    {
      id: 7,
      text: 'Given f(x) = 2x^2 − 7x − 10. What the absolute maximum of f on [−1,3]?',
      options: [
        '−1',
        '7/4',
        '−129/8',
        '9'
      ],
      correctAnswer: 2
    },
    {
      id: 8,
      text: 'The function f is given by x = x^4 + 4x^3. on which of the following interval is f strictly decreasing?',
      options: [
        '−3,0',
        '0, ∞',
        '−3, ∞',
        '−∞, −3'
      ],
      correctAnswer: 3
    },
    {
      id: 9,
      text: 'A spherical balloon is expanding at a rate of 60π m^3/sec. How fast is the surface area of the balloon expanding in meter square per second, when the radius of the balloon is 4m?',
      options: [
        '20π',
        '30π',
        '15π',
        '45π'
      ],
      correctAnswer: 1
    },
    {
      id: 10,
      text: 'A rectangular area of 3200 m^2 is to be fenced off. Two opposite sides will use fencing costing 1 birr per meter and the remaining side will use fencing costing 2 birr per meter. What is the dimension of the rectangle of the least cost?',
      options: [
        '32m and 100m',
        '16m and 200m',
        '40m and 80m',
        '8m and 400m'
      ],
      correctAnswer: 2
    },
    {
      id: 11,
      text: 'Evaluate ∫ 3x^2 − 2x dx from -1 to 2:',
      options: [
        '2',
        '4',
        '6',
        '14'
      ],
      correctAnswer: 2
    },
    {
      id: 12,
      text: 'Let f(x) = x^2 + 2. Then ∫ f(x) dx is equal to:',
      options: [
        'x^2 + 2x + C',
        'x^3 + 2x + C',
        'x^3/3 + 2x + C',
        'x^3/3 + x + C'
      ],
      correctAnswer: 2
    },
    {
      id: 13,
      text: 'The area of the region between the graph of y = 4x^3 + 2 and x-axis from x = 1 to x = 2 is',
      options: [
        '36',
        '23',
        '20',
        '17'
      ],
      correctAnswer: 3
    },
    {
      id: 14,
      text: 'If the standard deviation of the numbers −1,0,1, k is √5 where k > 0 then k is equal to:',
      options: [
        '4√5 / 3',
        '6',
        '2√6',
        '2√10'
      ],
      correctAnswer: 2
    },
    {
      id: 15,
      text: 'The mean deviation from the mean of the set of observations −1,0 and 4 is',
      options: [
        '3',
        '-2',
        '1',
        '2'
      ],
      correctAnswer: 3
    },
    {
      id: 16,
      text: 'Consider the following data x 5 7 9 10 12 15 f 8 6 2 2 2 6 Then, the mean deviation about the median for the data is:',
      image: 'https://elyonmain.vercel.app/MathsImages/16.png',
      options: [
        '3.15',
        '3.23',
        '3.25',
        '3.17'
      ],
      correctAnswer: 1
    },
    {
      id: 17,
      text: 'The mean and variance of 20 observations are found to be 10 and 4,respectively.on rechecking it was found that an observation 9 was incorrect and the correct observation was 11.then the correct variance is',
      options: [
        '4.01',
        '4.02',
        '3.98',
        '3.99'
      ],
      correctAnswer: 3
    },
    {
      id: 18,
      text: 'Consider the following frequency distribution of a grouped data, where a class interval includes its lower-class boundary and excludes its upper-class boundary. Which one of the following is true about the distribution above?',
      image: 'https://elyonmain.vercel.app/MathsImages/18.png',
      options: [
        'It is positively skewed.',
        'It is negatively skewed.',
        'The mode of the data is 20.',
        'The median of the data is 25.'
      ],
      correctAnswer: 0
    },
    {
      id: 19,
      text: 'In the following distribution the mean deviation about the mean and coefficient of mean deviation about the mean are 180 and 10, respectively, then what is the missing frequency f Value (x) 11-13 13-15 15-17 17-19 19-21 21-23 23-25 Frequency(f) 7 6 9 13 f 5 4',
      image: 'https://elyonmain.vercel.app/MathsImages/19.png',
      options: [
        '40',
        '18',
        '20',
        '16'
      ],
      correctAnswer: 1
    },
    {
      id: 20,
      text: 'Which of the following system of linear inequalities represent the shaded region given below?',
      image: 'https://elyonmain.vercel.app/MathsImages/20.png',
      options: [
        '2x + 5y ≥ 80, x + y ≤ 20, x ≥ 0, y ≤ 0',
        '2x + 5y ≥ 80, x + y ≤ 20, x ≥ 0, y ≥ 0',
        '2x + 5y ≤ 80, x + y ≤ 20, x ≥ 0, y ≥ 0',
        '2x + 5y ≤ 80, x + y ≤ 20, x ≥ 0, y ≤ 0'
      ],
      correctAnswer: 1
    },
    {
      id: 21,
      text: 'A small firm manufactures necklaces and bracelets. The total number of necklaces and bracelets that it can handle per day is at most 24. It takes one hour to make a bracelet and half an hour to make necklace. The maximum number of hours available per day is 16. If the profit on a necklace is birr 100 and that on a bracelet is 300. What is a linear programming problem for finding how many of each should be produced daily to maximize the profit if it is being given that at least one of each must be produced?',
      options: [
        'z = 100x + 300y subject to x + y ≤ 24, x + 1/2 y ≤ 16, x ≥ 0, y ≥ 0',
        'z = 100x + 300y subject to x + y ≤ 24, x + 1/2 y ≥ 16, x ≥ 0, y ≥ 0',
        'z = 100x + 300y subject to x + y ≤ 24, 1/2 x + y ≤ 16, x ≥ 1, y ≥ 1',
        'z = 100x + 300y subject to x + y ≤ 24, x + 1/2 y ≥ 16, x ≥ 1, y ≥ 1'
      ],
      correctAnswer: 2
    },
    {
      id: 22,
      text: 'One of the Ethiopian air line aeroplane can carry a maximum of 200 passengers. A profit of birr 1,000 is made on each executive class ticket and a profit of 600 birr is made on each economy class ticket. The airline reserves at least 20 seats for executive class. However at least 4 times as many passengers prefer to travel by economy class, than by executive class. The air line wants to maximize its profit. What is the maximum profit the air line can earn in birr?',
      options: [
        '128,000',
        '136,000',
        '144,000',
        '168,000'
      ],
      correctAnswer: 0
    },
    {
      id: 23,
      text: 'Furniture manufacturing company produces two different types of chairs A and B, to produce Chair A, it takes 3 hours for cutting and 5 hours for assembling. To produce chair B, it takes 6 hours for cutting and 3 hours for assembling. The Company has at most 120 hours for cutting labor and 95 hours for assembly labour per day. The company’s profit is 40 birr for each chair A produced and 60 birr for each chair B produced. If the company wants to maximize the profit, how many of each type should be made daily?',
      options: [
        '10 type A and 12 type B',
        '10 type A and 15 type B',
        '12 type A and 10 type B',
        '15 type A and 10 type B'
      ],
      correctAnswer: 1
    },
    {
      id: 24,
      text: 'The quartile deviation of daily wages (in birr) of seven workers are given below: 12,7,15,10,17,17,25 is',
      options: [
        '3.5',
        '5',
        '9',
        '14.5'
      ],
      correctAnswer: 0
    },
    {
      id: 25,
      text: 'Given C(x) = 62x^2 + 27,500 and R(x) = x^3 − 12x^2 + 40x + 10 where C(x) and R(x) represent, respectively, the total cost and total revenue from the production and sale of x items. What is the marginal profit when 50 units are produced and sold?',
      options: [
        '200',
        '340',
        '140',
        '800'
      ],
      correctAnswer: 2
    },
    {
      id: 26,
      text: 'A dietician has to develop a special diet using two foods P and Q. Each packet of food P contains 15 units of calcium, 6 units of iron, 7 units of cholesterol and 9 units of vitamin A. Each packet of the same quantity of food Q contains 5 units of calcium, 22 units of iron, 4 units of cholesterol and 3 units of vitamin A. The diet requires at least 245 units of calcium, at least 460 units of iron and at most 300 units of cholesterol. The dietician wants to minimize the amount of vitamin A in the diet. What is the minimum the amount of Vitamin in the diet?',
      options: [
        '225',
        '147',
        '140',
        '137'
      ],
      correctAnswer: 1
    },
    {
      id: 27,
      text: 'According to the division algorithm, what should be the value of p and q respectively so that, 290 = 11p + q?',
      options: [
        '3 and 26',
        '25 and 5',
        '26 and 4',
        '24 and 6'
      ],
      correctAnswer: 2
    },
    {
      id: 28,
      text: 'If the area of 12-sided regular polygon inscribed in a circle is 48 cm^2, then what is the radius of the circle?',
      options: [
        '4 cm',
        '3√3 cm',
        '3√2 cm',
        '2√3 cm'
      ],
      correctAnswer: 0
    },
    {
      id: 29,
      text: 'What is the simplified form of the expression 3 √128 / 4 − 2 √72 / 3 + 2 √50 / 5 is equal to:',
      options: [
        '2√2',
        '6√2',
        '4√2',
        '3√2'
      ],
      correctAnswer: 0
    },
    {
      id: 30,
      text: 'If ABCD is a parallelogram with AB = 6x − 8, BC = 4x + 14 and CD = 2x + 36, then what type of parallelogram ABCD is?',
      options: [
        'Square',
        'Difficult to identify',
        'Rhombus',
        'Rectangle'
      ],
      correctAnswer: 2
    },
    {
      id: 31,
      text: 'If a line passes through A(3,8) and B(-4,13), then what is the degree measure of the angle of inclination that the line makes with the positive x-axis?',
      options: [
        '120°',
        '150°',
        '135°',
        '30°'
      ],
      correctAnswer: 2
    },
    {
      id: 32,
      text: 'What is the solution set of the following system of linear equation? 3x + y = 6 −2y + 4x = 8',
      options: [
        '{2, 0}',
        '{−2, 0}',
        '{0, 2}',
        '{0, −2}'
      ],
      correctAnswer: 0
    },
    {
      id: 33,
      text: 'Given two sets R and S, such that R = {-1, 0, {−1, 1}} and S= {-1, 0, 1}, then which one of the following is true about these sets?',
      options: [
        'R ∪ S = S',
        'S \\ R = ∅',
        'R \\ S = S',
        'R ∩ S ∪ {−1,1} = S'
      ],
      correctAnswer: 3
    },
    {
      id: 34,
      text: 'From a top of a mountain 300 meters above sea level the angle of depression of two boats are 45° and 60° respectively. How far apart are the two boats?',
      options: [
        '100√3 − 3 m',
        '150√3 − 3 m',
        '150√3 m',
        '100√3 + 3 m'
      ],
      correctAnswer: 1
    },
    {
      id: 35,
      text: 'Given a right angle triangle ABC such that m∠C = 90°, m∠A = 60° and AB = 40cm which one of the following is the area of triangle ABC?',
      options: [
        '400√3 / 3 cm²',
        '200√3 cm²',
        '100√3 / 3 cm²',
        '400√3 cm²'
      ],
      correctAnswer: 1
    },
    {
      id: 36,
      text: 'For b > 0 and b ≠ 1. If log_b 2 = n and log_b 3 = m, then which one of the following expression is equal to log_b (9 / (8b))?',
      options: [
        '2m − 3n + 1',
        '2m − 3n − 1',
        '2n − 3m − 1',
        '3m − 2n − 1'
      ],
      correctAnswer: 1
    },
    {
      id: 37,
      text: 'Let a and b be non-zero real numbers, and r and s be positive integers. Which one of the following statements is true?',
      options: [
        '(a + b)^r = a^r + b^r',
        'b^{r s} = b^{r + s}',
        'a^r a^{-s} = a^{r - s}',
        'a^r / a^{-s} = a^{r + s}'
      ],
      correctAnswer: 2
    },
    {
      id: 38,
      text: 'If x^2 + kx + 9 ≥ 0 has truth set all real numbers, then which one of the following is the possible value of k is',
      options: [
        '{k : −6 ≤ k ≤ 6}',
        '{k : −6 < k < 6}',
        '{k : k < −6 or k > 6}',
        '{k : k ≤ −6 or k ≥ 6}'
      ],
      correctAnswer: 1
    },
    {
      id: 39,
      text: 'If you divide the polynomial f(x) = 4x^3 + x^2 − 20x + 8 by x – 1, then the remainder that you will get is = _______',
      options: [
        '33',
        '-7',
        '0',
        '7'
      ],
      correctAnswer: 1
    },
    {
      id: 40,
      text: 'A frustum of altitude 4 cm is formed from a right circular cone of altitude 8cm and base radius 6cm. What is the volume of the frustum?',
      options: [
        '84π cm³',
        '40π cm³',
        '80π cm³',
        '100π cm³'
      ],
      correctAnswer: 0
    },
    {
      id: 41,
      text: 'The graph of a certain polynomial function f is given below. Which one of the following is not true about this function?',
      image: 'https://elyonmain.vercel.app/MathsImages/41.png',
      options: [
        'The leading coefficient of f is positive',
        'f has a local maximum at x = c',
        'f has a local minimum at x = a',
        'The constant term of f is positive'
      ],
      correctAnswer: 3
    },
    {
      id: 42,
      text: 'Let θ be an angle in standard position and a point P(a, b) is on the terminal side of θ. If a > 0 and b > 0, then the secant of θ is equal to:',
      options: [
        '√(a² + b²) / a',
        'a / √(a² + b²)',
        '√(a² + b²) / b',
        'b / √(a² + b²)'
      ],
      correctAnswer: 0
    },
    {
      id: 43,
      text: 'What is the value of x, if 9^{3x−1} + 24 = 27^{2x}?',
      options: [
        '27',
        '−24',
        '1/2',
        '1/3'
      ],
      correctAnswer: 2
    },
    {
      id: 44,
      text: 'Two six faces fair dies are thrown once. What is the probability that the difference of the two numbers shown up is 2?',
      options: [
        '5/18',
        '1/3',
        '1/6',
        '2/9'
      ],
      correctAnswer: 3
    },
    {
      id: 45,
      text: 'Which one of the following system of linear inequalities represents the shaded region R?',
      image: 'https://elyonmain.vercel.app/MathsImages/45.png',
      options: [
        'R = {x, y : y ≤ x + 2; y ≥ 0 & x ≤ 3}',
        'R = {x, y : y ≤ x + 2; y ≥ 0 & x ≤ 3}',
        'R = {x, y : x ≤ y + 2; x ≥ 0 & x ≤ 3}',
        'R = {x, y : y ≤ x + 2 & x ≤ 3}'
      ],
      correctAnswer: 0
    },
    {
      id: 46,
      text: 'What is the domain of the expression 4 / (2 − 3x)?',
      options: [
        '[−2/3, ∞)',
        'R \\ {2/3}',
        '−∞, 2/3',
        '−∞, 2/3]'
      ],
      correctAnswer: 2
    },
    {
      id: 47,
      text: 'If a hemispherical iron ball of radius 3cm is placed on the top of a right circular cylinder of height 10 cm. What is the lateral surface area of this solid?',
      options: [
        '108π cm²',
        '87π cm²',
        '78π cm²',
        '76π cm²'
      ],
      correctAnswer: 2
    },
    {
      id: 48,
      text: 'If x = 0.323232332… and y = 0.232232223…, then x + y is equal to:',
      options: [
        '1/3',
        '5/9',
        '2/3',
        '1/2'
      ],
      correctAnswer: 1
    },
    {
      id: 49,
      text: 'Given two similar triangles and whose areas are 36 cm² and 48 cm². If one side length of the smaller triangle is 6cm, then what is length of the corresponding side of the larger triangle?',
      options: [
        '4√3 cm',
        '4√2 cm',
        '6√3 cm',
        '3√6 cm'
      ],
      correctAnswer: 0
    },
    {
      id: 50,
      text: 'In the circle shown below, O is the center, the radius measures 8cm and m(∠POQ) = 120°. Which one of the following is the area of the shaded region?',
      image: 'https://elyonmain.vercel.app/MathsImages/50.png',
      options: [
        '64/3 π cm²',
        '128/3 π cm²',
        '64π cm²',
        '128π cm²'
      ],
      correctAnswer: 0
    },
    {
      id: 51,
      text: 'Let U and V be two vectors given by U = (1/3)i − (4/3)j and V = −(4/3)i − (5/3)j, then the vector V + U is = ________________',
      options: [
        '2i – 2j',
        '-2i – 2j',
        '-i -2j',
        '–i – 3j'
      ],
      correctAnswer: 3
    },
    {
      id: 52,
      text: 'Which one of the following is true about two similar polygons?',
      options: [
        'They are also congruent.',
        'Their corresponding sides are congruent',
        'Their corresponding angles are congruent',
        'The ratio of their area is equal to the ratio of their corresponding sides.'
      ],
      correctAnswer: 2
    },
    {
      id: 53,
      text: 'In the figure given below, m∠BCD = 50°, m∠ADC = 30°. What is m∠APC?',
      image: 'https://elyonmain.vercel.app/MathsImages/53.png',
      options: [
        '100°',
        '40°',
        '20°',
        '60°'
      ],
      correctAnswer: 1
    },
    {
      id: 54,
      text: 'The solution set of the inequality 4 − 2x ≥ 10 is',
      options: [
        '[3, ∞)',
        '(-∞, −3] ∪ [7, ∞)',
        '[−3, 7]',
        '(-∞, −7] ∪ [−3, ∞)'
      ],
      correctAnswer: 1
    },
    {
      id: 55,
      text: 'Which one of the following relations is a function?',
      options: [
        'R1 = {(7, 5), (4, 6), (3, 10), (7, 8)}',
        'R2 = {(2, 6), (7, 14), (2, 8), (3, 12)}',
        'R3 = {(x, y) : x = father name and y = children name}',
        'R4 = {(x, y) : x = children name and y = father name}'
      ],
      correctAnswer: 3
    },
    {
      id: 56,
      text: 'Given; P: 2 is an even prime number. q: All quadrilaterals are rectangles. r: π is an irrational number. Using the above statements, which one of the following compound statements is always true?',
      options: [
        'p ∨ q',
        'p ∧ q',
        'q ∧ r',
        'p ⇒ q'
      ],
      correctAnswer: 0
    },
    {
      id: 57,
      text: 'If f(x) = (x − 4)/(x^2 − 16), then which one of the following is false?',
      options: [
        'Domain of f = R \\ {±4}',
        'f has a hole at x = −4',
        'The vertical asymptote is x = −4',
        'The horizontal asymptote is y = 0'
      ],
      correctAnswer: 1
    },
    {
      id: 58,
      text: 'A Gardner wants to fence in his plot of land in two equal rectangular sections. If he has 48 m of fence and the area of entire plot of land is 96 m². Then, what is the dimension of the garden?',
      options: [
        '6 m by 8 m',
        '8 m by 12 m',
        '6 m by 12 m',
        '6 m by 16 m'
      ],
      correctAnswer: 0
    },
    {
      id: 59,
      text: 'What is the determinant of the matrix A, det A, if A = [a a a c; b -b b c; c c -c²]?',
      options: [
        '2 a b c',
        '2 a b c²',
        '4 a b c',
        '4 a b c²'
      ],
      correctAnswer: 1
    },
    {
      id: 60,
      text: 'What is the solution set of the system x − 2y + z = −1, x + y − 2z = 2, −x + z = 1?',
      options: [
        '{0, 4, 1}',
        '{0, 4, 1}',
        '{1, 4, 2}',
        '∅'
      ],
      correctAnswer: 3
    },
    {
      id: 61,
      text: 'Which one of the following is the inverse of x = (1/2) ln(x − 2), for x > 2?',
      options: [
        'g(x) = e^{2x} − 2',
        'g(x) = 2 e^x − 2',
        'g(x) = e^{2x} + 2',
        'g(x) = 2 e^x − 2'
      ],
      correctAnswer: 2
    },
    {
      id: 62,
      text: 'If z1 and z2 are complex numbers, then which one of the following statements is not true about them?',
      options: [
        'z1 − z2 is a complex number.',
        'z1 + z2 is a complex number.',
        'z1 − z2 is always a real number.',
        'z1 + z2 can be a real number.'
      ],
      correctAnswer: 2
    },
    {
      id: 63,
      text: 'Which one is the standard form of the equation of the parabola with vertex (-2,3) and focus (2,3)?',
      options: [
        '(x + 2)^2 = 16(y − 3)',
        '(x − 2)^2 = 16(y − 3)',
        '(y − 3)^2 = 16(x + 2)',
        '(y − 3)^2 = −16(x − 2)'
      ],
      correctAnswer: 0
    },
    {
      id: 64,
      text: 'If x^2 + y^2 + k x = 1 be equation of a circle for some k ∈ R. What is the radius of the circle if its center is (3, 0)?',
      options: [
        '3',
        '√3',
        '√10',
        '√10'
      ],
      correctAnswer: 0
    },
    {
      id: 65,
      text: 'For how long must a sum be deposited in an account paying 12% compound interest in order to double in value?',
      options: [
        '5.41 years',
        '6.14 years',
        '7.24 years',
        '8 years'
      ],
      correctAnswer: 1
    }
  ]
};
