<script>
	import { onMount } from 'svelte'
	import { Tldraw } from 'tldraw'
	import 'tldraw/tldraw.css'

	let container

	onMount(() => {
\		import('react').then((React) => {
			import('react-dom/client').then(({ createRoot }) => {
				const root = createRoot(container)

				root.render(
					React.createElement(Tldraw, {
						onMount: (editor) => {
							editor.updateInstanceState({ isGridMode: true })

							// Set zoom constraints
							editor.setCameraOptions({
								zoomSteps: [0.25, 0.5, 1, 2, 4, 8],
							})

							// Camera bounds enforcement
							const TILE_SIZE = 40
							const unlisten = editor.sideEffects.registerAfterChangeHandler(
								'camera',
								(_prev, next) => {
									const camera = next
									const viewport = editor.getViewportScreenBounds()

									const visibleWidth = viewport.width / camera.z
									const visibleHeight = viewport.height / camera.z
									const maxVisibleTiles = 100 * TILE_SIZE

									let needsUpdate = false
									let newCamera = { ...camera }

									if (visibleWidth > maxVisibleTiles || visibleHeight > maxVisibleTiles) {
										const minZoom = Math.max(
											viewport.width / maxVisibleTiles,
											viewport.height / maxVisibleTiles
										)
										if (camera.z < minZoom) {
											newCamera.z = minZoom
											needsUpdate = true
										}
									}

									const maxPan = 2000
									const clampedX = Math.max(-maxPan, Math.min(maxPan, camera.x))
									const clampedY = Math.max(-maxPan, Math.min(maxPan, camera.y))

									if (clampedX !== camera.x) {
										newCamera.x = clampedX
										needsUpdate = true
									}
									if (clampedY !== camera.y) {
										newCamera.y = clampedY
										needsUpdate = true
									}

									if (needsUpdate) {
										editor.setCamera(newCamera, { immediate: true })
									}

									return next
								}
							)
						},
					})
				)
			})
		})
	})
</script>

<div bind:this={container} style="position: fixed; inset: 0;"></div>
