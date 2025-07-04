# Ethiopian Calendar Converter

A modern web application that provides accurate conversion between Ethiopian Calendar (E.C) and Gregorian Calendar (G.C) dates. Built with React, TypeScript, and Material-UI.

![Calendar Converter Screenshot](./screenshot.png)

## Features

- **Bi-directional Calendar Conversion:**
  - Convert from Ethiopian Calendar (E.C) to Gregorian Calendar (G.C)
  - Convert from Gregorian Calendar (G.C) to Ethiopian Calendar (E.C)
  - Real-time conversion updates
  
- **User-Friendly Interface:**
  - Clean and modern Material-UI design
  - Responsive layout for all devices
  - Easy-to-use date input fields
  
- **Accurate Calculations:**
  - Handles all Ethiopian months including Pagume
  - Proper leap year calculations for both calendars
  - Month-specific offset adjustments

## Ethiopian Calendar Overview

The Ethiopian calendar:
- Is 7-8 years behind the Gregorian calendar
- Has 13 months (12 months of 30 days each, plus Pagume of 5-6 days)
- New Year starts on Meskerem 1 (September 11 or 12 in G.C)
- Has its own unique leap year system

### Month Mappings

Ethiopian Calendar months and their approximate Gregorian Calendar correspondences:

1. Meskerem (መስከረም) → September/October
2. Tikimt (ጥቅምት) → October/November
3. Hidar (ኅዳር) → November/December
4. Tahsas (ታኅሳስ) → December/January
5. Tir (ጥር) → January/February
6. Yekatit (የካቲት) → February/March
7. Megabit (መጋቢት) → March/April
8. Miazia (ሚያዝያ) → April/May
9. Ginbot (ግንቦት) → May/June
10. Sene (ሰኔ) → June/July
11. Hamle (ሐምሌ) → July/August
12. Nehase (ነሐሴ) → August/September
13. Pagume (ጳጉሜ) → September

## Technical Implementation

### Tech Stack

- React 19
- TypeScript
- Material-UI 7
- Luxon for date handling
- Vite for build tooling

### Key Files

- `src/utils/calendarConverter.ts`: Core conversion logic
- `src/components/CalendarConverter.tsx`: Main UI component
- `src/App.tsx`: Application wrapper and theme provider

### Installation

1. Clone the repository:
\`\`\`bash
git clone [repository-url]
cd ethiopian-calendar-converter
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Build for production:
\`\`\`bash
npm run build
\`\`\`

## Usage Examples

### Converting from E.C to G.C

```typescript
// Example: Converting Yekatit 26, 1993 E.C
const ethiopianDate = {
  year: 1993,
  month: 6, // Yekatit
  day: 26
};
const gregorianDate = convertToGregorian(ethiopianDate);
// Returns: { year: 2001, month: 3, day: 5 }
```

### Converting from G.C to E.C

```typescript
// Example: Converting March 5, 2001 G.C
const gregorianDate = {
  year: 2001,
  month: 3,
  day: 5
};
const ethiopianDate = convertToEthiopian(gregorianDate);
// Returns: { year: 1993, month: 6, day: 26 }
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Ethiopian Calendar mathematical formulas and conversion logic
- Material-UI for the modern user interface components
- The React and TypeScript communities for excellent documentation and support

## Support

For support, please open an issue in the repository or contact [your-contact-information].

---

## Development Notes

### Calendar Conversion Logic

The conversion between Ethiopian and Gregorian calendars is handled through careful date arithmetic that considers:

1. The offset between calendars (7-8 years)
2. Different month lengths (30 days in Ethiopian calendar)
3. The unique 13th month (Pagume)
4. Leap year calculations in both calendar systems

### Future Improvements

- Add support for date ranges
- Include historical date conversions
- Add holiday calculations
- Implement calendar visualization
- Add support for Eritrean calendar variations
- Include more localization options
