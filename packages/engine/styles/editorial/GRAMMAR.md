# Editorial explainer · a look designed for this film

This style has no fixed look of its own. Design a coherent visual explanation for the topic, audience and the user's visual notes. Think of a well-edited illustrated science magazine brought to life: a large meaningful drawing, readable labels, careful spacing, and motion that demonstrates a cause. It can be crisp, playful or restrained. Complexity belongs in the explanation, not in decoration.

## Director: design once in storyboard.json

Add a top-level `look` object alongside `pages`:

```json
{
  "look": {
    "card": "Write at least 200 characters of specific art direction for THIS film: the running object and its consistent appearance; composition choices for questions, comparisons and derivations; roles of colours; type hierarchy; how motion reveals cause; transitions and what to avoid. Give rules every page can follow without seeing its neighbours.",
    "palette": { "paper": "#F7F4ED", "ink": "#242724", "soft": "#53605A", "muted": "#727C76", "faint": "#D9DED8", "blue": "#24766F", "red": "#B54F3C", "orange": "#AB691D", "green": "#547845", "purple": "#775E84", "yellow": "#B88C24" },
    "font": "sans",
    "line": "clean"
  }
}
```

The palette is an example, not mandatory. Use #RRGGBB values and keep ink strongly contrasted against paper. Define soft/muted colours that remain readable on the chosen background; define semantic accent colours for this film. Pale/dark `*F` fills are mixed toward paper automatically. Font must be `sans` (system sans serif), `serif` (system serif), or `hand` (the bundled LXGW WenKai). Line must be `clean`, `pen`, or `sketch`.

The server applies the chosen palette, font and line to every page. Page agents and reviewers receive `look.card`. Do not add a different palette or typeface on each page. Start from the user's visual notes, then make the missing choices yourself. Preserve those choices when revising the storyboard.

## Visual teaching

- Carry the same example through the lesson. Establish its shape, label and colour in the card so every page can recreate it.
- Pick the composition for the reasoning: a large annotated object, an evolving diagram, a side-by-side experiment, a calculation with the result attached to its subject. A repeated title and card grid is not the default.
- Show an initial state, change one condition, show the consequence. Use actual data from the material or explicitly hypothetical inputs; do not invent precise-looking attention scores or investment returns as evidence.
- Give the main object most of the available area. Short titles, body text at least 36px, labels at least 28px, generous separation. Keep y > 900 clear for subtitles.
- Use one leading accent per moment. Colour supports meaning; texture, glow and ornament must not compete with the explanation.
- Use a literal subject rather than a generic metaphor when it helps. Cast is `none`, `hands` or `silhouette`; this style does not draw faces.

## Motion

- A meaningful scene exists from the first frame. Reveal evidence when it is discussed, preserving enough context to compare.
- One focus at a time: move a quantity, trace a relationship, highlight a changed condition. Static evidence may remain while the voice explains it.
- Let the camera move briefly between context and detail, then hold. No idle looping, decorative particles or mandatory transition effects.
- A worked example can take 20–35 seconds; a question or conclusion can be shorter. End on the changed state that answers the opening question.

## Page agent and reviewer

The film's own style card is authoritative for its appearance. Use its palette names and shared visual identities. Judge whether the mechanism is legible and the change matches the narration, alongside the normal layout checks. Do not demand the example palette or a fixed layout.
