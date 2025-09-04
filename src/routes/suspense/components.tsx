async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function DelayedMessage() {
  await delay(1000)
  return <div className="text-2xl font-semibold text-gray-800">Hello</div>
}