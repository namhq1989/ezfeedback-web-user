import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useEffect, useState } from 'react'

interface IColorPickerProps {
  color: string
  onChange: (color: string) => void
}

// Helper to validate hex color
const isValidHexColor = (color: string): boolean => {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)
}

// Storage key for recently used colors
const RECENT_COLORS_KEY = 'ezfeedback-recent-colors'

// Load recently used colors from localStorage
const loadRecentColors = (): string[] => {
  try {
    const stored = localStorage.getItem(RECENT_COLORS_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Failed to load recent colors:', error)
    return []
  }
}

// Save a color to recently used colors
const saveRecentColor = (color: string) => {
  try {
    if (!isValidHexColor(color)) return

    const recentColors = loadRecentColors()
    // Remove color if it already exists
    const filteredColors = recentColors.filter((c) => c !== color)
    // Add color to the beginning and limit to 8 colors
    const newRecentColors = [color, ...filteredColors].slice(0, 8)
    localStorage.setItem(RECENT_COLORS_KEY, JSON.stringify(newRecentColors))
  } catch (error) {
    console.error('Failed to save recent color:', error)
  }
}

const ColorPicker = ({ color, onChange }: IColorPickerProps) => {
  const [customColor, setCustomColor] = useState(color)
  const [isValid, setIsValid] = useState(true)
  const [recentColors, setRecentColors] = useState<string[]>([])

  // Reduced default color palette (8 colors)
  const defaultColors = [
    '#f44336',
    '#e91e63',
    '#2196f3',
    '#4caf50',
    '#ffeb3b',
    '#ff9800',
    '#795548',
    '#607d8b',
  ]

  // Load recent colors on component mount
  useEffect(() => {
    setRecentColors(loadRecentColors())
  }, [])

  const handleColorSelect = (selectedColor: string) => {
    // Save to recent colors
    saveRecentColor(selectedColor)
    // Update recent colors state
    setRecentColors(loadRecentColors())
    // Update input value
    setCustomColor(selectedColor)
    // Call the onChange prop
    onChange(selectedColor)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCustomColor(value)
    setIsValid(value.startsWith('#') ? isValidHexColor(value) : true)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && isValid && customColor.startsWith('#')) {
      handleColorSelect(customColor)
    }
  }

  return (
    <div className='space-y-3'>
      {/* Line 1: Default colors */}
      <div>
        <div className='grid grid-cols-8 gap-2'>
          {defaultColors.map((colorOption) => (
            <div
              key={colorOption}
              className={`w-8 h-8 rounded-xl cursor-pointer ${
                colorOption === color ? 'ring-2 ring-offset-2 ring-black' : ''
              }`}
              style={{ backgroundColor: colorOption }}
              onClick={() => handleColorSelect(colorOption)}
            />
          ))}
        </div>
      </div>

      <Separator />

      {/* Line 2: Recently used colors */}
      {recentColors.length > 0 && (
        <div>
          <div className='text-xs text-gray-500 mb-2'>Recently used</div>
          <div className='grid grid-cols-8 gap-2'>
            {recentColors.map((colorOption) => (
              <div
                key={colorOption}
                className={`w-8 h-8 rounded-xl cursor-pointer ${
                  colorOption === color ? 'ring-2 ring-offset-2 ring-black' : ''
                }`}
                style={{ backgroundColor: colorOption }}
                onClick={() => handleColorSelect(colorOption)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Line 3: Custom color input and preview */}
      <div>
        <div className='flex items-center space-x-2'>
          <Input
            value={customColor}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder='#000000'
            className={`w-full ${!isValid ? 'border-red-500' : ''}`}
          />
          <div
            className={`w-7 h-6 rounded-full cursor-pointer border overflow-hidden ${!isValid ? 'opacity-50' : ''}`}
            style={{ backgroundColor: isValid ? customColor : '#cccccc' }}
            onClick={() =>
              isValid &&
              customColor.startsWith('#') &&
              handleColorSelect(customColor)
            }
          />
        </div>
      </div>
    </div>
  )
}

export default ColorPicker
