export function useClock() {
  const time = ref('')
  let timer: ReturnType<typeof setInterval> | undefined
  const format = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' })
  const tick = () => { time.value = format.format(new Date()) }

  onMounted(() => {
    tick()
    timer = setInterval(tick, 10_000)
  })
  onBeforeUnmount(() => clearInterval(timer))
  return time
}
