# LOCAL 2-PLAYER CHESS

## Complete Product Specification

**Document status:** Master product specification / single source of
truth\
**Scope:** Browser-based chess for two people sharing the same device

> **Purpose:** This document is the single source of truth for building
> a browser-based Local 2-Player Chess application. The application is
> specifically designed for **two people playing on the same device**.

### Out of scope

The application does **not** require:

-   Online multiplayer
-   Accounts
-   Login
-   Signup
-   Matchmaking
-   A backend for local gameplay
-   An AI opponent

------------------------------------------------------------------------

# 1. Product Flow

The primary product flow is:

**Player Setup → Start Game → Local Chess Match → Game Result → Rematch
/ New Game / Setup**

The application should make this progression immediately understandable
and should not introduce unrelated flows.

------------------------------------------------------------------------

# 2. Player Setup

## Required

-   White Player name
-   Black Player name
-   Start Game button

## Optional

-   Color selection
-   Timer
-   Increment
-   Auto Flip
-   Sound

## Behavior

-   Player names must remain available for the **current session** so
    that rematches and new games can reuse them.
-   Starting a game must validate required setup fields before entering
    gameplay.
-   Optional settings should have clear defaults and should not prevent
    a basic no-clock game from starting.

------------------------------------------------------------------------

# 3. Chess Board

The board is the primary visual element of the application.

## Requirements

-   Responsive 8×8 chess board
-   Support mobile
-   Support tablet
-   Support laptop
-   Support desktop
-   Support large monitors
-   Use a maximum sensible board size on large screens
-   No horizontal scrolling during gameplay
-   High contrast
-   Professional chess pieces

The board should resize to available space while preserving a square
aspect ratio.

------------------------------------------------------------------------

# 4. Gameplay

Support the following interaction model:

-   Tap/click to select a piece
-   Tap/click a destination square
-   Drag and drop where appropriate
-   Legal move indicators
-   Illegal move prevention
-   Captures
-   Turn switching
-   Last-move highlight
-   Check indication
-   Checkmate indication

## Rule authority

The UI must **never** be the source of truth for chess legality.

Chess legality must be determined by a reliable chess-rules
implementation or a thoroughly tested rules engine. UI highlights,
drag/drop behavior, and selectable squares must be derived from that
authoritative game state.

A move must be rejected if it is not legal, even if a UI interaction
attempts to perform it.

------------------------------------------------------------------------

# 5. Chess Rules

Implement:

-   King
-   Queen
-   Rook
-   Bishop
-   Knight
-   Pawn
-   Castling
-   En passant
-   Promotion
-   Check
-   Checkmate
-   Stalemate
-   Draw conditions
-   Legal move validation

Use a reliable chess rules implementation or a thoroughly tested rules
engine.

The implementation must enforce the complete chess ruleset defined by
the application's chess-rules reference. In particular:

-   A player may never make a move that leaves their own king in check.
-   Special moves must be validated by the rules engine.
-   Terminal states must prevent further moves.
-   The UI must reflect the authoritative game state rather than
    independently deciding legality.

------------------------------------------------------------------------

# 6. Auto Flip

Provide:

**Auto Flip: ON / OFF**

When enabled:

-   Rotate the board after each legal move.
-   Orient the current player naturally.
-   Keep player labels aligned with their side.

Also provide:

**Manual Flip Board**

Manual flipping changes the board presentation only; it must not change
the game state, side to move, move history, or legality.

Auto Flip should occur only after a **legal move** has been applied.

------------------------------------------------------------------------

# 7. Clock

## Options

-   No Clock
-   1 min
-   3 min
-   5 min
-   10 min
-   15 min
-   Custom

## Increment

Support an optional increment, for example:

**5 + 3**

meaning five minutes initial time with three seconds added after each
legal move, subject to the application's selected clock rules.

## Behavior

-   The active player's clock runs during that player's turn.
-   The clock switches after every legal move.
-   An illegal move must not switch the clock.
-   Clock state must remain synchronized with the authoritative turn
    state.
-   A clock reaching zero ends the game according to the applicable
    chess clock rules.
-   Clock operation should pause when the game is over.
-   No clock is active when the No Clock option is selected.

------------------------------------------------------------------------

# 8. Controls

## Primary controls

-   Undo
-   New Game
-   Menu

## Menu

The menu should provide:

-   Undo
-   Restart
-   Flip Board
-   Sound
-   Board Theme
-   Resign
-   Exit to Setup

Controls should remain secondary to the board and should be accessible
without obscuring gameplay.

## Control semantics

-   **Undo:** Revert the most recent reversible game state according to
    the application's local undo policy.
-   **New Game:** Start a new local game flow.
-   **Restart:** Restart the current game configuration from its initial
    position.
-   **Flip Board:** Manually rotate the board presentation.
-   **Sound:** Toggle game sounds.
-   **Board Theme:** Change the visual board theme from supported local
    options.
-   **Resign:** Start the resignation confirmation flow.
-   **Exit to Setup:** Leave the current game and return to Player
    Setup.

A terminal game must not accept ordinary gameplay moves.

------------------------------------------------------------------------

# 9. Move History

Show standard chess notation where possible.

Example:

``` text
1. e4 e5
2. Nf3 Nc6
```

## Requirements

-   Move history should update after each legal move.
-   It should reflect captures, checks, checkmate, castling, promotion,
    and other notation details where supported by the chess rules
    implementation.
-   Move history is secondary to the board.
-   It should remain readable without competing visually with the board.

------------------------------------------------------------------------

# 10. Captured Pieces

Captured-piece display is optional.

If implemented:

-   Keep it visually subtle.
-   Do not create a statistics dashboard.
-   Do not use captured pieces to fabricate rankings, performance
    metrics, or other unsupported statistics.

------------------------------------------------------------------------

# 11. Sound

Support sounds for:

-   Move
-   Capture
-   Check
-   Game Over

Provide a master control:

**Sound: ON / OFF**

Sound must respect the user's selected setting and must not interfere
with the ability to play without audio.

------------------------------------------------------------------------

# 12. Score System

Track actual results during the **current session**.

Example:

``` text
Omar
Wins: 3

Ahmed
Wins: 2

Draws: 1
```

These are real local game results.

## Requirements

-   Increment a player's wins only when that player actually wins a
    completed local game.
-   Increment draws only for actual drawn games.
-   Do not use fake website metrics.
-   Do not present local-session counts as global statistics.
-   Session score should remain associated with the current player
    names.

------------------------------------------------------------------------

# 13. Game Result

Clearly show the terminal result.

Example:

``` text
CHECKMATE

Omar Wins

Omar
Wins: 3

Ahmed
Wins: 2

Draws: 1
```

## Actions

-   Rematch
-   New Game
-   Back to Setup

The winner should be visually clear without excessive animation.

## Result integrity

The result screen must be derived from the actual game-ending condition,
such as checkmate, resignation, timeout, or draw.

------------------------------------------------------------------------

# 14. Resign

Menu action:

**Resign**

Require confirmation before ending the game.

If confirmed:

-   End the game.
-   Record the opponent as the winner.
-   Update the session score.
-   Show the result screen.

If the user cancels confirmation, the game continues unchanged.

------------------------------------------------------------------------

# 15. Responsive Design

## Mobile portrait

-   Board dominant
-   No gameplay scrolling
-   Controls accessible
-   Player information remains readable
-   Avoid unnecessary panels

## Tablet

-   Board centered
-   Balanced player information
-   Controls remain easy to reach
-   Preserve board dominance

## Desktop

-   Board centered
-   Maximum sensible board size
-   Clean surrounding space
-   Player information aligned with the board
-   Avoid excessive empty or decorative UI

The gameplay layout must not require horizontal scrolling at supported
viewport sizes.

------------------------------------------------------------------------

# 16. Fullscreen

Support fullscreen gameplay where the browser/device allows it.

Do not force fullscreen if the platform does not permit it.

Fullscreen is a presentation enhancement, not a requirement for the core
game to function.

------------------------------------------------------------------------

# 17. Visual System

## Primary

-   Black
-   White
-   Charcoal

## Accent

-   Deep Green

## Optional

-   Subtle Gold

## Strict visual exclusions

**Never use purple.**

Avoid:

-   Purple gradients
-   Excessive gradients
-   Excessive glass effects
-   Neon colors
-   Visual clutter

The visual system should be minimal, premium, functional, and
board-focused.

------------------------------------------------------------------------

# 18. Accessibility

Requirements:

-   Color contrast
-   Keyboard-friendly forms
-   Clear focus states
-   Clear labels
-   Semantic HTML
-   Accessible player inputs
-   Do not communicate game state using color alone
-   Appropriate alt text for meaningful images
-   Touch-friendly controls

## Additional implementation expectations

-   All interactive controls should be reachable by keyboard where
    applicable.
-   Focus indicators must remain visible.
-   Form inputs should have associated accessible labels.
-   Disabled controls should expose appropriate disabled semantics.
-   Important game states such as check, checkmate, active turn, and
    disabled actions should have text, iconography, or structural cues
    in addition to color.
-   Touch targets should be appropriately sized and spaced for reliable
    use.

------------------------------------------------------------------------

# 19. Privacy

Only collect necessary information.

Local gameplay should not require:

-   Account
-   Email
-   Password
-   Personal profile

Do not add tracking unless necessary.

## Review before release

Review the implementation for:

-   Cookie consent
-   Form consent
-   Third-party embeds
-   Privacy requirements
-   Copyright
-   Applicable local laws

This specification does not itself constitute legal advice. Any
legal/privacy obligations should be reviewed against the jurisdictions
and services actually used by the released application.

------------------------------------------------------------------------

# 20. Branding

Creator credit:

**Made by Omar Osama**

Website:

**https://omar-osama-ali.github.io/**

Keep the creator credit and website subtle and professional. They should
not compete with the chessboard or primary gameplay controls.

------------------------------------------------------------------------

# 21. Strictly Forbidden

Do not add:

-   Online multiplayer
-   Login
-   Signup
-   Matchmaking
-   AI opponent
-   Purple
-   Purple gradients
-   Fake counters
-   Fake metrics
-   Fake reviews
-   Emoji icons
-   Pill buttons
-   Cursor animation
-   Excessive scroll animation
-   AI-generated decorative imagery
-   Made with AI label
-   AI-sounding marketing copy
-   Unsupported claims
-   Unnecessary data collection

These exclusions apply to the product unless explicitly changed by a
later authoritative specification.

------------------------------------------------------------------------

# 22. Final QA

Before release, test:

-   [ ] Legal moves
-   [ ] Captures
-   [ ] Check
-   [ ] Checkmate
-   [ ] Stalemate
-   [ ] Castling
-   [ ] En passant
-   [ ] Promotion
-   [ ] Draws
-   [ ] Turn switching
-   [ ] Timer
-   [ ] Increment
-   [ ] Auto Flip
-   [ ] Undo
-   [ ] Resign
-   [ ] Restart
-   [ ] Rematch
-   [ ] Score tracking
-   [ ] Responsive layout
-   [ ] Accessibility
-   [ ] Keyboard navigation
-   [ ] Contrast
-   [ ] Privacy behavior
-   [ ] Asset licensing
-   [ ] Copyright

------------------------------------------------------------------------

# Master Specification Rule

This document is the **master product specification** for the Local
2-Player Chess application.

Implementation decisions must remain consistent with this specification.

Do not contradict this specification unless explicitly instructed to do
so by a later authoritative requirement.
