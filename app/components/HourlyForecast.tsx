"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ForecastData } from "@/lib/services/weather/types"

const chartConfig = {
  temperature: {
    label: "Temperature",
    color: "rgba(255, 255, 255, 0.9)",
  },
} satisfies ChartConfig

interface HourlyForecastProps {
  forecast: ForecastData
}

export function HourlyForecast({ forecast }: HourlyForecastProps) {
  const [timeRange, setTimeRange] = React.useState("24h")

  const chartData = React.useMemo(() => {
    const hoursToShow = timeRange === "24h" ? 24 : timeRange === "12h" ? 12 : 6
    return forecast.list
      .slice(0, hoursToShow)
      .map(item => ({
        time: item.dt_txt,
        temperature: Math.round(item.main.temp)
      }))
  }, [forecast.list, timeRange])

  return (
    <div className="relative overflow-hidden backdrop-blur-glassmorphic bg-glass-gradient border border-glass-border rounded-2xl w-full transition-all duration-300 hover:bg-glass-background-hover">
      <div className="absolute inset-0 bg-glass-background opacity-50"></div>
      <div className="relative z-10">
        <div className="flex items-center gap-2 space-y-0 border-b border-glass-border py-3 px-4 sm:flex-row">
          <div className="grid flex-1 gap-0.5 text-center sm:text-left">
            <h2 className="text-lg font-medium text-white/90">Hourly Temperature</h2>
            <p className="text-xs text-white/70">
              Temperature breakdown for {forecast.city.name}
            </p>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="w-[160px] rounded-lg sm:ml-auto bg-white/10 border-glass-border text-white hover:bg-white/20 transition-colors"
              aria-label="Select time range"
            >
              <SelectValue placeholder="Next 24 hours" />
            </SelectTrigger>
            <SelectContent className="rounded-xl bg-glass-gradient backdrop-blur-glassmorphic border-glass-border">
              <SelectItem value="24h" className="rounded-lg text-white/90 hover:bg-white/10">
                Next 24 hours
              </SelectItem>
              <SelectItem value="12h" className="rounded-lg text-white/90 hover:bg-white/10">
                Next 12 hours
              </SelectItem>
              <SelectItem value="6h" className="rounded-lg text-white/90 hover:bg-white/10">
                Next 6 hours
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="pt-2 sm:pt-3 text-white/90">
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[200px] w-full"
          >
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="fillTemp" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="rgba(255, 255, 255, 0.3)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="rgba(255, 255, 255, 0.1)"
                    stopOpacity={0.2}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid 
                vertical={false} 
                stroke="rgba(255, 255, 255, 0.1)"
              />
              <XAxis
                dataKey="time"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tick={{ fill: 'rgba(255, 255, 255, 0.7)' }}
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return date.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                  })
                }}
              />
              <ChartTooltip
                cursor={false}
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '0.5rem',
                }}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                      })
                    }}
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey="temperature"
                type="monotone"
                fill="url(#fillTemp)"
                stroke="rgba(255, 255, 255, 0.9)"
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </div>
    </div>
  )
}
