<template>
  <div class="accordion">
	<div :key="i"
		class="accordion-item"
		v-for="(content, i) in contents"
		v-bind:class="{ 'accordion-active': content.active }"
	>
		<div class="accordion-header">
			<a href="#" v-on:click="expand(event, i)">
				<div class="accordion-header-div">{{ content.title }}</div>
				<div class="accordion-header-div">
					<div class="accordion-caret"></div>
				</div>
			</a>
		</div>
		<div class="accordion-body" v-bind:ref="'accordion-body-' + i">
			<div class="accordion-content">{{ content.description }}</div>
		</div>
	</div>
</div>
</template>

<script>
Vue.component('zz-accordion', {
	props: ['contents'],
	data: function() {
		return {
		}
	},
	methods: {
		expand: function(e, i) {
			e.preventDefault();

			let el = this.$refs['accordion-body-' + i][0];

			if (this.contents[i].active === false) {
				this.contents[i].active = true;

				TweenLite.to(el, 1, {
					height: el.scrollHeight,
					ease: Elastic.easeOut.config(1, 0.3)
				});
			} else {
				this.contents[i].active = false;

				TweenLite.to(el, 0.5, {
					height: 0,
					ease: Bounce.easeOut
				});
			}
		}
	},
	template: `

`
});

</script>

<style>

</style>