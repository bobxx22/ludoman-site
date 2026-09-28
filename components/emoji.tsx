interface EmojiProps {
  emoji: string
  size?: number
  className?: string
}

export default function Emoji({ emoji, size = 24, className = "" }: EmojiProps) {
  // Get the code point of the emoji
  const codePoint = emoji.codePointAt(0)?.toString(16)

  return (
    <img
      src={`https://cdn.jsdelivr.net/gh/iamcal/emoji-data/img-apple-64/${codePoint}.png`}
      alt={emoji}
      className={className}
      style={{ width: `${size}px`, height: `${size}px`, display: "inline-block", verticalAlign: "middle" }}
    />
  )
}
