# Asset review — 31 October 2026

## Selected: Tesla optimus / Mechamaner.V

- Source: https://sketchfab.com/3d-models/tesla-optimus-2fab5d31927f43729a99a6e8eaf1c7f5
- Author: https://sketchfab.com/jjeendral36
- License: CC BY 4.0, https://creativecommons.org/licenses/by/4.0/. Attribution, source, license link and changes are retained.
- The Sketchfab public API marked the model downloadable. Standard browser download required signing in; the user signed in, then the original archive was downloaded through Sketchfab's download UI.
- Archive: one `source/Tesla optimus.glb`, 3 737 372 bytes. Original exporter string: `Khronos glTF Blender I/O v4.3.47`. This string identifies the exporter; it is not treated as an exact Blender application version.
- Original: 122 706 triangles, 62 144 vertices in Sketchfab metadata; one mesh/node, six material groups, no textures, skin or animations. Metadata snapshot: `sketchfab-metadata.json`. Binary inspection: `model-inspection.json`.
- Head separability: not a separate named object, but original material groups `Head`, `Lights`, `Face` isolate the head, continuous neck with its base, face surface and light border. No triangles were cut or recreated. Original geometry data is copied exactly.
- Export: `public/models/optimus-head.glb`, 323 236 bytes, 13 612 triangles, three materials, zero textures. 91.4% smaller. No lossy compression or decimation was needed. Exact hashes and verification: `model-preparation.json`.

## Visual inspection of the loaded GLB

Inspected in the project's own Three.js scene, not only a marketplace viewer:

| View | Observation | Evidence |
| --- | --- | --- |
| Front | Continuous dark visor, elongated rounded silhouette, readable lower rim; smooth reflections. | `qa/head-front.jpg` |
| Side (90°) | Curved profile, visor border and rear shell visible; neck transition is continuous. The angular illuminated seam is part of the author's source design. | `qa/head-side.jpg` |
| Three quarters (36°) | Surface volume and visor depth remain readable; no obvious faceting at the delivered display size. | `qa/head-angle.jpg` |

The hero uses larger camera framing and fades the existing neck base into the background. Geometry is unchanged. Three studio lights, PMREM reflections and ACES tone mapping are controlled in code. Source PBR materials are retained; environment intensity is tuned to 1.3. This is an artist's interpretation based on Optimus. Official generation accuracy is not asserted.

## Paid candidate: Optimus Tesla Bot Gen 3 / WolFsamii

Source: https://www.cgtrader.com/3d-models/character/sci-fi-character/optimus-tesla-bot-gen-3

The listing showed $15, Blender 4.3 / Cycles (314 MB), FBX (two files, 218 MB), OBJ (three files, 217 MB), and PNG/textures (201 MB). The author claims about 110 000 vertices, a humanoid rig and 2K PBR maps. GLB is not listed. Marketplace renders show a smooth reflective face and detailed body; thumbnails cannot establish topology, head separation or close-up shading quality. Those remain unverified because the paid source was not acquired. Published renders were inspected for evaluation and are not included in the site.

The listing uses “Royalty Free License (no AI)”. CGTrader's Royalty Free guidance restricts giving end users access to the source model: https://help.cgtrader.com/hc/en-us/articles/360015124437-Royalty-Free-License. A web-delivered GLB is retrievable, so an appropriate web redistribution permission or compatible license would need to be confirmed before integration. No purchase or seller contact was made. The seller's generation label is not proof of an accurate Tesla Gen 3 design.

## Official generation naming and media

Tesla's Q4 2025 Update (28 January 2026, p. 8) uses the name Gen 3: https://assets-ir.tesla.com/tesla-contents/IR/TSLA-Q4-2025-Update.pdf.

Q3 2026 Update (21 October 2026, p. 6) reports the production status: https://assets-ir.tesla.com/tesla-contents/IR/TSLA-Q3-2026-Update.pdf.

These sources do not establish that either marketplace asset matches the exact Gen 3 appearance. The site therefore keeps the hero generation-neutral. The 2023 stage is titled “Optimus · 2023” instead of asserting an unverified “Gen 1” label. Official YouTube videos are embedded with their controls and source links; the website does not redistribute MP4 copies.


## Close-up refinement update

The active rendering file is now `optimus-head-smooth-v2.glb` (1 759 760 bytes, 122 508 triangles). The original extracted file above remains unchanged. New intermediate points refine each curved patch using Phong interpolation, while preserving every original control point and the axis bounds. Maximum interpolation offsets are recorded per material in `model-smoothing.json` (less than 0.025 source units, about 0.52% of the head/neck height). Lossless meshopt decoding is checked with the actual runtime decoder. Updated view screenshots show the refined version.

The renderer uses multisample render targets and SMAA, with adjusted visor roughness and studio reflections. Responsive camera fitting and the stacked narrow layout prevent the canvas boundary from cropping the face.
