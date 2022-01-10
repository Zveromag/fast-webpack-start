<template>
  <div class="skeleton">
    <svg
      :viewBox="`0 0 ${width} ${height}`"
      preserveAspectRatio="xMidYMid meet"
    >
      <rect
        :style="`fill: url(#${idGradient})`"
        :clip-path="`url(#${idClip})`"
        x="0"
        y="0"
        :width="width"
        :height="height"
      />
      <defs>
        <clipPath :id="idClip">
          <template v-if="hasSlot">
            <slot />
          </template>
          <template v-else>
            <rect
              x="0"
              y="0"
              :rx="radius"
              :ry="radius"
              :width="width"
              :height="height"
            />
          </template>
        </clipPath>
        <linearGradient :id="idGradient">
          <stop
            offset="-0.83638"
            :stop-color="primaryColor"
            stop-opacity="1"
          >
            <animate
              attributeName="offset"
              values="-2; 1"
              dur="1.3s"
              repeatCount="indefinite"
            />
          </stop>

          <stop
            offset="-0.33638"
            :stop-color="secondaryColor"
            stop-opacity="1"
          >
            <animate
              attributeName="offset"
              values="-1.5; 1.5"
              dur="1.3s"
              repeatCount="indefinite"
            />
          </stop>
          <stop
            offset="0.16362"
            :stop-color="primaryColor"
            stop-opacity="1"
          >
            <animate
              attributeName="offset"
              values="-1; 2"
              dur="1.3s"
              repeatCount="indefinite"
            />
          </stop>

        </linearGradient>
      </defs>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Skeleton',
  props: {
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 150
    },
    primaryColor: {
      type: String,
      default: '#e5e5e5'
    },
    secondaryColor: {
      type: String,
      default: '#f3f3f3'
    },
    radius: {
      type: Number,
      default: 3
    }
  },
  computed: {
    hasSlot() {
      return this.$slots.default;
    },
    idGradient() {
      return this.uid();
    },
    idClip() {
      return this.uid();
    }
  },
  methods: {
    uid() {
      return Math.random()
        .toString(36)
        .substring(2);
    }
  }
};
</script>

<style lang="scss" scoped>
.skeleton {
  width: 100%;
  svg {
    width: 100%;
  }
}
</style>
