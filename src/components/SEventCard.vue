<script>
export default {
    name: 'SEventCard'
}
</script>


<template>
<div class="card">
    <slot name="eventtitle"></slot>       
        <div class="content">
            
            <div class="column-one">
                <br>
                <slot name="teams"></slot>
            </div> 
            <div class="column-two">
                ML
                <br>
                 <slot name="ml"></slot>
            </div>
            <div class="column-three">
                Spread
                <br>
              <slot name="spread"></slot>
            </div> 
        </div>
</div> 

</template>
<style lang="scss" scoped>

.content {
  display: grid;
  grid-column-gap: 1em;
  grid-row-gap: 3em;

}

.card {
border: 2px solid #000000;
border-radius: 4px;
padding: .5rem;
 
}


.column-one {
    grid-column:1;
}

.column-two {
    grid-column: 2;
}

.column-three {
    grid-column: 3;
}

</style>
