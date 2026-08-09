// GENERATED FILE — do not edit by hand.
// Regenerate with: node scripts/generate-image-manifest.mjs
// Source of truth is the actual files in public/images.

export type ImageDimensions = { width: number; height: number };

export const imageDimensions: Record<string, ImageDimensions> = {
  "/images/headshot.jpeg": { width: 504, height: 527 },
  "/images/projects/cv/01_summary_sam_vs_augmented.png": { width: 1500, height: 1680 },
  "/images/projects/cv/02_baseline_tracking_metrics.png": { width: 1784, height: 656 },
  "/images/projects/cv/03_augmentation_ablation_ade.png": { width: 1482, height: 978 },
  "/images/projects/cv/04_multi_seed_detection_ade.png": { width: 1034, height: 580 },
  "/images/projects/cv/05_lstm_forecast_comparison.png": { width: 1784, height: 727 },
  "/images/projects/cv/06_lstm_variant_ade_bar.png": { width: 1184, height: 582 },
  "/images/projects/cv/07_lstm_rule_ablation_bar.png": { width: 1500, height: 600 },
  "/images/projects/cv/08_a2_per_rule_delta_ade.png": { width: 1800, height: 600 },
  "/images/projects/cv/09_forecast_qualitative.png": { width: 1500, height: 1492 },
  "/images/projects/cv/10_forecast_qualitative_clean.png": { width: 1500, height: 1492 },
  "/images/projects/cv/11_multiseq_perclip_bar.png": { width: 1500, height: 600 },
  "/images/projects/cv/12_multiseq_train_vs_transfer.png": { width: 1650, height: 675 },
  "/images/projects/cv/13_multiseq_transfer_bar.png": { width: 1500, height: 600 },
  "/images/projects/cv/14_sample_frame.jpg": { width: 1280, height: 720 },
  "/images/projects/misc/heap-allocator.jpg": { width: 500, height: 500 },
  "/images/projects/misc/huffman.png": { width: 500, height: 500 },
  "/images/projects/misc/mission-malama.avif": { width: 250, height: 250 },
  "/images/projects/servo-gate/build-01.jpg": { width: 2000, height: 1506 },
  "/images/projects/servo-gate/build-02.jpg": { width: 2000, height: 2656 },
  "/images/projects/warehouse/chaos.png": { width: 2000, height: 1229 },
  "/images/projects/warehouse/end.png": { width: 2000, height: 1231 },
  "/images/projects/warehouse/spawn.png": { width: 2000, height: 1219 },
  "/images/projects/warehouse/thumbnail.png": { width: 1563, height: 1189 },
};

/** Falls back to a 16:10 box for any path missing from the manifest. */
export function getImageDimensions(src: string): ImageDimensions {
  return imageDimensions[src] ?? { width: 1600, height: 1000 };
}
