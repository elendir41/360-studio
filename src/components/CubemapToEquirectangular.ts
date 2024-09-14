import * as THREE from 'three';

const vertexShader = `
attribute vec3 position;
attribute vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

varying vec2 vUv;

void main()  {
  vUv = vec2(1.0 - uv.x, uv.y);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
precision mediump float;

uniform samplerCube map;

varying vec2 vUv;

#define M_PI 3.1415926535897932384626433832795

void main()  {
  vec2 uv = vUv;

  float longitude = uv.x * 2.0 * M_PI - M_PI + M_PI / 2.0;
  float latitude = uv.y * M_PI;

  vec3 dir = vec3(
    -sin(longitude) * sin(latitude),
    cos(latitude),
    -cos(longitude) * sin(latitude)
  );
  normalize(dir);

  gl_FragColor = textureCube(map, dir);
}
`;

export class CubemapToEquirectangular {
  private width: number;
  private height: number;
  private renderer: THREE.WebGLRenderer;
  private material: THREE.RawShaderMaterial;
  private scene: THREE.Scene;
  private quad: THREE.Mesh;
  private camera: THREE.OrthographicCamera;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null;
  private cubeCamera: THREE.CubeCamera | null;
  private attachedCamera: THREE.PerspectiveCamera | null;
  private output: THREE.WebGLRenderTarget;
  private cubeMapSize: number;

  constructor(renderer: THREE.WebGLRenderer, provideCubeCamera: boolean) {
    this.width = 1;
    this.height = 1;
    this.renderer = renderer;

    this.material = new THREE.RawShaderMaterial({
      uniforms: {
        map: { value: null }
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      side: THREE.DoubleSide,
      transparent: true
    });

    this.scene = new THREE.Scene();
    this.quad = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      this.material
    );
    this.scene.add(this.quad);

    this.camera = new THREE.OrthographicCamera(1 / -2, 1 / 2, 1 / 2, 1 / -2, -10000, 10000);

    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.cubeCamera = null;
    this.attachedCamera = null;

    this.setSize(4096, 2048);

    const gl = this.renderer.getContext();
    if (gl) {
      this.cubeMapSize = gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE);
    }

    if (provideCubeCamera) {
      this.getCubeCamera(2048);
    }
  }

  setSize(width: number, height: number): void {
    this.width = width;
    this.height = height;

    this.quad.scale.set(this.width, this.height, 1);

    this.camera.left = this.width / -2;
    this.camera.right = this.width / 2;
    this.camera.top = this.height / 2;
    this.camera.bottom = this.height / -2;

    this.camera.updateProjectionMatrix();

    this.output = new THREE.WebGLRenderTarget(this.width, this.height, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      wrapS: THREE.ClampToEdgeWrapping,
      wrapT: THREE.ClampToEdgeWrapping,
      format: THREE.RGBAFormat,
      type: THREE.UnsignedByteType
    });

    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  getCubeCamera(size: number): THREE.CubeCamera {
    const cubeMapSize = Math.min(this.cubeMapSize, size);
    
    const options = { format: THREE.RGBAFormat, magFilter: THREE.LinearFilter, minFilter: THREE.LinearFilter };
    const renderTarget = new THREE.WebGLCubeRenderTarget(cubeMapSize, options);
    
    this.cubeCamera = new THREE.CubeCamera(0.1, 1000, renderTarget);
    return this.cubeCamera;
  }

  attachCubeCamera(camera: THREE.PerspectiveCamera): void {
    this.getCubeCamera(2048);
    this.attachedCamera = camera;
  }

  convert(cubeCamera: THREE.CubeCamera, download: boolean = true): ImageData {
    if (!this.ctx) {
      throw new Error('Canvas context is not available');
    }

    this.material.uniforms.map.value = cubeCamera.renderTarget.texture;
    this.renderer.setRenderTarget(this.output);
    this.renderer.render(this.scene, this.camera);

    const pixels = new Uint8Array(4 * this.width * this.height);
    this.renderer.readRenderTargetPixels(this.output, 0, 0, this.width, this.height, pixels);

    const imageData = new ImageData(new Uint8ClampedArray(pixels), this.width, this.height);

    if (download !== false) {
      this.download(imageData);
    }

    return imageData;
  }

  private download(imageData: ImageData): void {
    if (!this.ctx) {
      throw new Error('Canvas context is not available');
    }

    this.ctx.putImageData(imageData, 0, 0);

    this.canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const fileName = `pano-${document.title}-${Date.now()}.png`;
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.setAttribute('download', fileName);
        anchor.className = 'download-js-link';
        anchor.innerHTML = 'downloading...';
        anchor.style.display = 'none';
        document.body.appendChild(anchor);
        setTimeout(() => {
          anchor.click();
          document.body.removeChild(anchor);
        }, 1);
      }
    }, 'image/png');
  }

  update(camera: THREE.PerspectiveCamera, scene: THREE.Scene): void {
    const autoClear = this.renderer.autoClear;
    this.renderer.autoClear = true;
    if (this.cubeCamera) {
      this.cubeCamera.position.copy(camera.position);
      this.cubeCamera.update(this.renderer, scene);
      this.renderer.autoClear = autoClear;
      this.convert(this.cubeCamera);
    } else {
      console.warn('CubeCamera is not initialized');
    }
  }
}
