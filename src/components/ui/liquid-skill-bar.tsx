import React, { useRef, useEffect, useState } from "react";

interface LiquidSkillBarProps {
  years: number; // 0〜5
  label: string;
  yearsUnit?: string;
  startAnimation?: boolean;
}

// 年数に応じて色をHSLで生成（0年:青→5年:赤）
function getColorByYears(years: number) {
  // 0: 220(青) → 5: 10(赤)
  const hue = 220 - (210 * Math.min(years, 5)) / 5;
  return `hsl(${hue}, 80%, 55%)`;
}

const TANK_WIDTH = 60;
const TANK_HEIGHT = 180;
const WAVE_COUNT = 3; // 合成するsin波の数

const LiquidSkillBar: React.FC<LiquidSkillBarProps> = ({ years, label, yearsUnit, startAnimation }) => {
  const waveRef = useRef<SVGPathElement>(null);
  const [fillPercent, setFillPercent] = useState(0); // 0〜1
  const color = getColorByYears(years);
  const targetFill = Math.max(0, Math.min(years / 5, 1));

  // ランダムなsin波パラメータ（各タンク独立）
  const waveParams = useRef(
    Array.from({ length: WAVE_COUNT }).map(() => ({
      amplitude: 5 + Math.random() * 7, // 5〜12
      frequency: 1.5 + Math.random() * 2.5, // 1.5〜4
      speed: (0.012 + Math.random() * 0.025) * 1.5, // 0.018〜0.055（1.5倍速）
      phase: Math.random() * Math.PI * 2,
    }))
  );
  // 全体の上下揺れ
  const sloshPhase = useRef(Math.random() * Math.PI * 2);

  // 水位アニメーション（0→targetFillまで、さらにゆっくり）
  useEffect(() => {
    if (!startAnimation) return;
    let frame: number;
    let start: number | null = null;
    const duration = 8000; // ms（よりゆっくり）
    function animateFill(ts: number) {
      if (start === null) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(1, elapsed / duration);
      // イージング関数でより自然な動き
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setFillPercent(targetFill * easedProgress);
      if (progress < 1) {
        frame = requestAnimationFrame(animateFill);
      } else {
        setFillPercent(targetFill);
      }
    }
    setFillPercent(0);
    frame = requestAnimationFrame(animateFill);
    return () => cancelAnimationFrame(frame);
  }, [targetFill, startAnimation]);

  // 波アニメーション（リアルな水面波、波速アップ）
  useEffect(() => {
    let frame = 0;
    let running = true;
    const animate = () => {
      if (!waveRef.current) return;
      frame++;
      const fillY = TANK_HEIGHT * (1 - fillPercent);
      let d = `M 0 ${TANK_HEIGHT} L 0 ${fillY} `;
      for (let x = 0; x <= TANK_WIDTH; x += 2) {
        // 端の減衰（cosカーブで0.5〜1）
        const edgeAttenuation = 0.6 + 0.4 * Math.cos((Math.PI * x) / TANK_WIDTH);
        // 複数sin波の合成
        let yOffset = 0;
        waveParams.current.forEach((w, i) => {
          yOffset +=
            Math.sin(
              (x / TANK_WIDTH) * Math.PI * w.frequency + frame * w.speed + w.phase
            ) * w.amplitude * edgeAttenuation;
        });
        // 全体の上下揺れ（スロッシング）
        const slosh = Math.sin(frame * 0.018 + sloshPhase.current) * 2.2; // 1.5倍速
        // 微細な揺らぎ
        const micro = Math.sin(frame * 0.027 + x * 0.19) * 0.8; // 1.5倍速
        const y = fillY + yOffset + slosh + micro;
        d += `L ${x} ${y} `;
      }
      d += `L ${TANK_WIDTH} ${TANK_HEIGHT} Z`;
      waveRef.current.setAttribute("d", d);
      if (running) requestAnimationFrame(animate);
    };
    animate();
    return () => {
      running = false;
    };
  }, [fillPercent]);

  return (
    <div className="flex flex-col items-center mx-2" style={{ width: TANK_WIDTH }}>
      <div className="relative" style={{ width: TANK_WIDTH, height: TANK_HEIGHT }}>
        {/* タンク本体 */}
        <div
          className="absolute inset-0 rounded-2xl border border-white/30 bg-[#2228]"
          style={{ boxShadow: `0 2px 8px 0 ${color}33` }}
        />
        {/* 液体（波） */}
        <svg
          width={TANK_WIDTH}
          height={TANK_HEIGHT}
          viewBox={`0 0 ${TANK_WIDTH} ${TANK_HEIGHT}`}
          className="absolute top-0 left-0"
        >
          <path
            ref={waveRef}
            fill={color}
            fillOpacity={0.85}
            style={{ transition: "fill 0.4s" }}
          />
        </svg>
        {/* 枠線上書き */}
        <div className="absolute inset-0 rounded-2xl border-2 border-white/40 pointer-events-none" />
      </div>
      <div className="flex flex-col items-center mt-2">
        <span className="text-white font-semibold text-base text-center leading-tight">
          {label}
        </span>
        <span className="text-white/80 text-sm">{years}{yearsUnit}</span>
      </div>
    </div>
  );
};

export default LiquidSkillBar; 