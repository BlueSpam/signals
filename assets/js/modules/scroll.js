function load() {
  var data = document.body.getAttribute("data-signal");

  if (data) {
    var cluster = document.querySelector(".cluster");

    if (innerWidth >= 1024) {
      var boundary_height = parseInt(
        getComputedStyle(
          document.querySelector(".boundary"),
          ":before"
        ).getPropertyValue("height")
      );

      var cluster_height = cluster.offsetHeight;
      var cluster_offset = cluster.offsetTop;
      var cluster_area = innerHeight - cluster_offset;

      var signal_element = document.querySelector("#signal-" + data);
      var signal_offset = signal_element.offsetTop - cluster_offset;
      var signal_space = cluster_height - signal_offset;
      var signal_padding = cluster_area - signal_space - boundary_height;

      if (signal_padding > 0)
        cluster.style.paddingBottom = signal_padding + "px";

      scrollTo(0, signal_offset);
    }

    if (!cluster.classList.contains("cluster--loaded"))
      cluster.classList.add("cluster--loaded");
  }
}

export { load };
