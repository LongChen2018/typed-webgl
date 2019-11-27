// Vertex shader for background rendering.

attribute vec4 aPosition;
attribute vec2 aTexCoord;
varying highp vec2 vTexCoord;

void main() {

  gl_Position = aPosition;
  vTexCoord = aTexCoord;

}