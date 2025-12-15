# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is "IAlingo" - a Duolingo-style educational web application built with Next.js, React, TypeScript, Tailwind CSS, and Zustand. The app teaches users about Large Language Models (LLMs) through interactive lessons organized into modules and topics.

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Architecture Overview

### State Management (Zustand)

The app uses a unified Zustand store pattern with multiple slices combined into a single store:

- **Location**: All stores are in `src/stores/`
- **Main store**: `useBoundStore.ts` combines all store slices using `create()` from Zustand
- **Individual slices**: Each slice (GoalXp, Language, Progress, Lingot, SoundSettings, Streak, User, Xp) is defined in separate files with pattern `create[Name]Store.ts`
- **Progress persistence**: The `progressStore.ts` uses Zustand's `persist` middleware to save user progress to localStorage
- **Type pattern**: Each slice exports a `[Name]Slice` type and uses `BoundStateCreator<SliceState>` for type safety

### Module/Topic System

Educational content is structured hierarchically:

1. **Modules** (`IModule`): Top-level learning units defined in `src/data/ialingoModules.ts`
2. **Topics** (`ITopic`): Individual lessons within modules
3. **Steps** (`IStep`): Sequential content pieces within topics
4. **Interactions** (`IInteraction`): Quiz/exercise components within steps

**Module data location**: Content modules are imported from separate files in `src/data/modules/` directory (e.g., `fundamentosModule`, `riscosLimitacoesModule`, etc.)

### Interaction Types

Seven interaction types are defined in `src/types/ialingo.ts`:

- `MULTIPLE_CHOICE`: Single-select quiz
- `TRUE_FALSE`: True/false statement
- `SCENARIO_JUDGMENT`: Scenario-based question
- `MULTI_SELECT`: Multiple selection quiz
- `RISK_IDENTIFIER`: Identify risks in scenarios
- `DO_DONT_SORT`: Sort items into Do/Don't categories
- `SHORT_REFLECTION`: Free-text reflection

Each interaction type has:
- A component in `src/components/interactions/`
- A data interface (e.g., `IMultipleChoiceInteractionData`)
- Routing through the main `Interaction.tsx` component (switch statement)

### Routing Structure

- `/` - Login/home page (`src/pages/index.tsx`)
- `/learn` - Main learning page showing all modules (`src/pages/learn.tsx`)
- `/lesson/[moduleId]/[topicId]` - Dynamic route for individual lessons (`src/pages/lesson/[moduleId]/[topicId].tsx`)
- Other pages: `/leaderboard`, `/profile`, `/shop`, `/reference`, `/settings/*`

### Topic Status System

Topics have three states (`TopicStatus` enum):
- `LOCKED`: Not yet accessible
- `ACTIVE`: Available to start
- `COMPLETE`: Finished by user

**Status logic** (`learn.tsx:getTopicStatus`):
- First topic is always ACTIVE
- A topic becomes ACTIVE when the previous topic is COMPLETE
- Status is determined by checking `completedTopicIds` from the progress store

### Path Aliases

TypeScript is configured with path alias `~/` → `./src/`:
```typescript
import { useBoundStore } from "~/stores/useBoundStore"
```

## Key Implementation Patterns

### Adding New Interaction Types

1. Add enum value to `InteractionType` in `src/types/ialingo.ts`
2. Create data interface extending `IInteractionData`
3. Create component in `src/components/interactions/[Name]Interaction.tsx`
4. Add case to switch statement in `src/components/interactions/Interaction.tsx`

### Creating New Modules

1. Create module data file in `src/data/modules/[moduleName].ts`
2. Export module with structure matching `IModule` interface
3. Import and add to `ialingoModulesData` array in `src/data/ialingoModules.ts`
4. Module will automatically appear on `/learn` page

### Progress Tracking

The `TopicPlayer` component automatically:
- Tracks time spent per step using `startTime` state
- Calls `addTimeSpent()` when navigating between steps
- Calls `markTopicAsComplete()` when finishing the last step
- Progress persists in localStorage via Zustand middleware

## Styling Notes

- **Framework**: Tailwind CSS with custom configuration
- **Theme colors**: IAlingo uses blue as primary color (e.g., `bg-blue-600`, `bg-blue-500`)
- **Topic states**: Gray (locked), Blue (active), Yellow (complete)
- **Responsive**: Mobile-first with `lg:` breakpoints for desktop layouts
- **Layout**: Three-column layout on desktop (LeftBar, Main, RightBar), BottomBar for mobile

## TypeScript Configuration

- Strict mode enabled
- Path alias: `~/*` maps to `./src/*`
- `noUncheckedIndexedAccess` enabled for array safety
- Target: ES2017
