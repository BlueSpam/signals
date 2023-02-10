var origin = document.querySelector(".origin");

var controller = document.querySelector(".controller");
var controller_active = false;
var controller_offset = [0, 0];
var controller_timeout;
var controller_pressed;
var controller_padding;

function ready() {
  if (controller) {
    controller_padding = parseInt(
      getComputedStyle(
        document.querySelector(".controller a")
      ).getPropertyValue("padding")
    );

    var controller_observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.attributeName === "style") {
          sessionStorage.setItem("controller_right", controller.style.right);
          sessionStorage.setItem("controller_bottom", controller.style.bottom);
        }
      });
    });

    controller_observer.observe(controller, {
      attributes: true,
      attributeFilter: ["style"],
    });

    if (
      sessionStorage.getItem("controller_right") &&
      sessionStorage.getItem("controller_bottom")
    ) {
      controller.style.right = sessionStorage.getItem("controller_right");
      controller.style.bottom = sessionStorage.getItem("controller_bottom");
    }

    document.querySelector(".controller a").onclick = function () {
      if (!controller_pressed) return false;
    };

    controller.addEventListener("mousedown", (e) => {
      e.preventDefault();

      controller_active = true;
      controller_pressed = true;
      controller_timeout = setTimeout(function () {
        controller_pressed = false;
      }, 300);

      controller_offset = [
        controller.offsetLeft + controller.offsetWidth - e.clientX,
        controller.offsetTop + controller.offsetHeight - e.clientY,
      ];

      controller.classList.remove("controller--transition");
    });

    controller.addEventListener("mouseup", (e) => {
      controller_active = false;

      clearTimeout(controller_timeout);

      var controller_overlap = overlap();

      if (controller_overlap) {
        sessionStorage.removeItem("controller_right");
        sessionStorage.removeItem("controller_bottom");

        controller.removeAttribute("style");

        if (!controller.classList.contains("controller--transition"))
          controller.classList.add("controller--transition");

        if (!controller.classList.contains("controller--origin"))
          controller.classList.add("controller--origin");
      }
    });

    document.addEventListener("mousemove", (e) => {
      if (controller_active) {
        var controller_x = innerWidth - (e.clientX + controller_offset[0]);
        var controller_y = innerHeight - (e.clientY + controller_offset[1]);

        if (
          controller_x >= -controller_padding &&
          controller_x + controller.offsetWidth <=
            innerWidth + controller_padding
        ) {
          controller.style.right = controller_x + "px";
        } else if (controller_x <= -controller_padding) {
          controller.style.right = -controller_padding;
        }

        if (
          controller_y >= -controller_padding &&
          controller_y + controller.offsetHeight <=
            innerHeight + controller_padding
        ) {
          controller.style.bottom = controller_y + "px";
        } else if (controller_y <= -controller_padding) {
          controller.style.bottom = -controller_padding;
        }

        overlap();
      }
    });
  }
}

function resize() {
  if (controller) {
    controller_padding = parseInt(
      getComputedStyle(
        document.querySelector(".controller a")
      ).getPropertyValue("padding")
    );

    if (controller.offsetLeft <= -controller_padding) {
      var controller_resize_right =
        innerWidth + controller_padding - controller.offsetWidth;

      if (controller_resize_right < -controller_padding)
        controller_resize_right = -controller_padding;

      controller.style.right = controller_resize_right + "px";

      sessionStorage.setItem("controller_right", controller.style.right);
    }

    if (controller.offsetTop <= -controller_padding) {
      var controller_resize_bottom =
        innerHeight + controller_padding - controller.offsetHeight;

      if (controller_resize_bottom < -controller_padding)
        controller_resize_bottom = -controller_padding;

      controller.style.bottom = controller_resize_bottom + "px";

      sessionStorage.setItem("controller_bottom", controller.style.bottom);
    }
  }
}

function load() {
  if (controller) {
    if (!controller.classList.contains("controller--loaded"))
      controller.classList.add("controller--loaded");
  }
}

function overlap() {
  if (
    controller.offsetTop + controller.offsetHeight < origin.offsetTop ||
    controller.offsetTop > origin.offsetTop + origin.offsetHeight ||
    controller.offsetLeft + controller.offsetWidth < origin.offsetLeft ||
    controller.offsetLeft > origin.offsetLeft + origin.offsetWidth
  ) {
    origin.classList.remove("origin--overlap");

    return false;
  } else {
    if (!origin.classList.contains("origin--overlap"))
      origin.classList.add("origin--overlap");

    return true;
  }
}

export {
  origin,
  controller,
  controller_active,
  controller_offset,
  controller_timeout,
  controller_pressed,
  controller_padding,
  ready,
  resize,
  load,
  overlap,
};
