/* ========================================================================
 * Bootstrap: modal.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#modals
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 * Modifications - September 2013
 * @Nick Piscitelli
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */
+function ($) { "use strict";
  var Modal = function(ele,options){
      this.options = options
      this.$element = $(ele)
      this.isShown = null
  }
  Modal.DEFAULTS = {
        backdrop: $('<div class="backdrop" />')
      , show: true
      , beforeSend: false
      , error: function(x,y,z){}
      , requesttype: 'GET'
      , datatype: 'html'
      , nomodalcache: false
      , cache: false
      , lasturi: false
      , async: true
      , success: false
      , data: undefined
  }
  Modal.prototype.toggle = function (target) {
      return this[!this.isShown ? 'show' : 'hide'](target)
  }
  Modal.prototype.load = function(target){
      var that = this
      if (this.options.remote && ((that.options.lasturi || that.options.remote) != $(document).data('lastURI') || this.options.nomodalcache)){
        $.ajax({
          url: this.options.remote,
          cache: this.options.cache,
          type: this.options.requesttype,
          data: this.options.data,
          dataType: this.options.datatype,
          async: this.options.async,
          beforeSend: function(){
              that.$element.addClass('loader').html($('#popTemplate')[0].outerHTML).find('#popTemplate').removeAttr('id style')
              that.pop()
          },
          success: function(data,textStat,jqXHR){
            that.$element.removeClass('loader').html(data)
            that.pop()
            $(document).data('lastURI',that.options.lasturi || that.options.remote)
          },
          error: this.options.error
        });
      }
      var e  = $.Event('modal.loaded', { target: target })
      this.$element.trigger(e)
  }
  Modal.prototype.show = function (target) {
      var that = this
      var e    = $.Event('modal.show', { target: target })
      if (this.isShown || e.isDefaultPrevented()){
          return
      }
      this.pop()
      this.isShown = true
      this.$element.trigger(e)
      this.load()
      this.$element.on('click.dismiss.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))
      if(this.options.backdrop){
          $(document.body).append(this.options.backdrop.show())
          this.options.backdrop.on('click',function(e){
              e.preventDefault()
              that.hide()
          })
          this.$element.on('click',function(e){
              e.stopPropagation()
          })
      }
      var e = $.Event('shown.bs.modal', { target: target })
      this.$element.trigger(e)
  }
  Modal.prototype.pop = function(){
    var w= this.$element.outerWidth(), h = this.$element.outerHeight(),win = $(window)
    var wDim = {
        height: win.height(),
        width: win.width()
    }
    var ft = ((wDim.height - h)/2), fl = ((wDim.width  - w)/2)
    this.$element.css({
        display: 'block',
        position: 'fixed',
        top: (ft > 0 ? ft : 0)+'px',
        left: (fl > 0 ? fl : 0)+'px',
        right: 'auto',
        bottom: 'auto'
    })
  }
  Modal.prototype.hide = function(e){
    var that = this
      if (e) e.preventDefault()
      e = $.Event('hide.bs.modal')
      this.$element.trigger(e)
      if (!this.isShown || e.isDefaultPrevented()) return
      this.isShown = false
      this.$element.hide()
      if(this.options.backdrop){
        this.options.backdrop.fadeOut('fast',function(){
          that.options.backdrop.remove();
          that.$element.trigger('hidden.bs.modal')
        })
      }else{
        that.$element.trigger('hidden.bs.modal')
      }
  }
  $.fn.modal = function (option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)
      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show){
        data.show(_relatedTarget)
      }
    })
  }
  $.fn.modal.Constructor = Modal
  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href');
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
    var option  = $target.data('modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())
    e.preventDefault()
    $target.modal(option, this)
  })
  $(document)
    .on('show.bs.modal',  '.modal', function () { $(document.body).addClass('modal-open') })
    .on('hidden.bs.modal', '.modal', function () {
      $(document.body).removeClass('modal-open')
      $('.modal').removeData('bs.modal')
    })
}(window.jQuery);
$(function(){
    $(window).on('resize',function(){
        $('.modal:visible').data('bs.modal') && $('.modal:visible').data('bs.modal').pop();
    });
});